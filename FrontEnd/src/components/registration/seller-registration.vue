<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section>
    <FormKit type="button" :ignore="false" @click="buyerPage()">
      Register as Buyer
    </FormKit>
  </section>
  <FormKit type="form" @submit="sellerRegister" enctype="multipart/form-data">
    <section class="container parent_sect">
      <FormKit type="text" label="First Name" v-model="userDetails.fname" />

      <FormKit type="text" label="Last Name" v-model="userDetails.lname" />

      <FormKit type="number" label="Phone Number" v-model="userDetails.phone" />

      <!-- <FormKit
        type="text"
        label="Name Of Offering"
        v-model="userDetails.nameOfOffering"
      />

      <FormKit
        type="number"
        label="Estimated Value"
        v-model="userDetails.estimatedValue"
      /> -->

      <FormKit type="text" label="Address" v-model="userDetails.address" />

      <FormKit
        type="select"
        label="State"
        placeholder="Select a State"
        :options="states"
        v-model="userDetails.province"
        @change="triggerChange(userDetails.province)"
      >
      </FormKit>

      <FormKit
        type="select"
        label="City"
        placeholder="Select City"
        :options="cities"
        v-model="userDetails.city"
      />

      <FormKit
        type="text"
        label="Postal Zip Code"
        help="format: a1b-c2d | a1bc2d | a1b c2d"
        v-model="userDetails.postalCode"
      />

      <FormKit
        name="idproof"
        type="file"
        label="Photo of Government ID"
        accept=".jpg,.jpeg,.png"
        help="Upload a goverment approved ID such as Driving License or Passport. 
        Only .pdf,.jpg,.jpeg,.png files allowed"
        v-model="userDetails.photoId"
      />

      <!-- <FormKit
        type="textarea"
        label="Description"
        v-model="userDetails.description"
      /> -->
      <FormKit
        type="checkbox"
        label="Terms and Conditions"
        help="Do you agree to our terms of service?"
        name="terms"
        :value="false"
        v-model="userDetails.termsCondition"
      />

      <hr />

      <FormKit
        type="email"
        label="Email"
        v-model="userDetails.email"
        @blur="checkUserExists(userDetails.email)"
      />

      <FormKit type="password" label="Password" />

      <FormKit type="password" label="Confirm Password" />

      <FormKit type="button" label="Submit" />
    </section>
  </FormKit>
</template>
<script lang="ts" setup>
import { validation } from "@/constants";
import type {
  IGetStateDetails,
  IGetUserDetails,
  ISelectResponse,
} from "@/interfaces/seller-registration";
import router from "@/router";
import AuthService from "@/services/AuthService";
import type { register } from "@formkit/core";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
const states = ref<ISelectResponse<string>[]>([]);
const cities = ref<ISelectResponse<string>[]>([]);
let userDetails = reactive<IGetUserDetails>({
  fname: "",
  lname: "",
  email: "",
  phone: "",
  nameOfOffering: "",
  estimatedValue: null,
  photoId: "",
  description: "",
  termsCondition: false,
  address: "",
  password: "test123",
  city: "",
  province: "",
  postalCode: "",
  dateOfbirth: new Date(),
  age: null,
});
let isUserAlreadyRegistered = ref<boolean>(false);
onMounted(async () => {
  try {
    await AuthService.getUploadImage();
    let response = await AuthService.getStates();
    states.value = [];
    for (let i = 0; i < response.data.length; i++) {
      states.value.push({
        label: response.data[i].province,
        value: response.data[i].province,
      });
    }
    console.warn(states.value);
  } catch (e) {
    console.error("Error in fetching states", e);
  }
});
const login = () => {
  router.push("/login");
};
const buyerPage = () => {
  router.push("/buyer-details");
};

const sellerRegister = async (data: any) => {
  userDetails.age = 20;
  console.log(data);
  const body = new FormData();
  // Finally, we append the actual File object(s)
  data.idproof.forEach((fileItem: any) => {
    console.warn(fileItem);
    body.append("image", fileItem.file);
  });

  for (const value of body.values()) {
    console.error(value);
  }

  for (var key of body.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  userDetails.photoDetail = body;
  console.warn(body);
  console.warn(userDetails.photoDetail);
  const headerConfig = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  await AuthService.uploadImage(body, headerConfig);

  // const response = await AuthService.register(userDetails);
};

const checkUserExists = async (email: string) => {
  console.warn("User Exists", email);
  try {
    await AuthService.checkUserExist(email)
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("TEst");
  } catch {
    console.error("Error in checking user existence");
  }
};
const triggerChange = async (val: string) => {
  console.warn(val);
  cities.value = [];
  try {
    let response = await AuthService.getCities();
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      cities.value.push({
        label: response.data[i].cities,
        value: response.data[i].cities,
      });
    }
    console.warn(cities.value);
  } catch (e) {
    console.error("Error in pulling cities");
  }
};
</script>
<style>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
