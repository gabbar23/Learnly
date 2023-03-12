<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="login">
    <div id="form4">
      <FormKit
        type="form"
        @submit="sellerRegister"
        enctype="multipart/form-data"
      >
        <section class="container parent_sect">
          <FormKit type="text" label="First Name" v-model="userDetails.firstName" />

      <FormKit type="text" label="Last Name" v-model="userDetails.lastName" />

      <FormKit type="number" label="Phone Number" v-model="userDetails.phone" />
      <FormKit type="date" label="Date of birth"/>     
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
        v-model="userDetails.provinceName"
        @change="triggerChange(userDetails.provinceName)"
      >
      </FormKit>

      <FormKit
        type="select"
        label="City"
        placeholder="Select City"
        :options="cities"
        v-model="userDetails.cityName"
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
      />

          <!-- <FormKit
        type="textarea"
        label="Description"
        v-model="userDetails.description"
      /> -->
          <br />
          <FormKit
            type="checkbox"
            label="Terms and Conditions"
            help="Do you agree to our terms of service?"
            name="terms"
            :value="false"
            v-model="userDetails.termsCondition"
          />

          <br />
          <FormKit
            type="email"
            label="Email"
            v-model="userDetails.email"
            @blur="checkUserExists(userDetails.email)"
          />
          <div class="error" v-if="isUserAlreadyRegistered">
            User Already Registered.
          </div>
          <br />

          <FormKit type="password" label="Password" v-model="userDetails.password" />

          <FormKit type="password" label="Confirm Password" />
        </section>
      </FormKit>
    </div>
  </div>
  <section>
    <div id="login">
      <div id="form">
        <FormKit type="button" :ignore="false" @click="login()">
          Already have an account? Sign In!
        </FormKit>
    <!--    <h1 class="align_center">OR</h1>
        <FormKit type="button" :ignore="false" @click="buyerPage()">
          Register as Buyer
        </FormKit>  -->
      </div>
    </div>
  </section>
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
import { fa } from "@formkit/i18n";
import { label } from "@formkit/inputs";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
const states = ref<ISelectResponse<string>[]>([]);
const cities = ref<ISelectResponse<string>[]>([]);
let userDetails = reactive<IGetUserDetails>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nameOfOffering: "",
  estimatedValue: null,
  photoId: "1",
  description: "a",
  termsCondition: false,
  address: "",
  password: "",
  cityName: "",
  provinceName: "",
  photoDetail:undefined,
  postalCode: "a1b-c2d",
  dateOfBirth: new Date(),
  age: null,
  isBuyer:false,
  isVerified:true,
  gender:"male",
  
});
const isUserAlreadyRegistered = ref<boolean>(false);
onMounted(async () => {
  try {
    //await AuthService.getUploadImage();
    let response = await AuthService.getStates();
    states.value = [];
    for (let i = 0; i < response.data.length; i++) {
      console.warn(response.data[i].province_name)
      states.value.push({
        label: response.data[i].province_name,
        value: response.data[i].province_name,
      });
    }
    console.log(states.value);
  } catch (e) {
    console.error("Error in fetching states", e);
  }
});
const login = () => {
  router.push("/");
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
  //await AuthService.uploadImage(body, headerConfig);

  const response = await AuthService.register(userDetails);
};

const checkUserExists = async (email: string) => {
  console.warn("User Exists", email);
  try {
    await AuthService.checkUserExist(email)
      .then((res) => {
        console.warn(res);
        isUserAlreadyRegistered.value = res.data.isUserAlreadyPresent;
      })
      .catch((err) => {
        console.error(err);
        isUserAlreadyRegistered.value = false;
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
  //  console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      console.log(response.data[i].city)
      cities.value.push({
        label: response.data[i].city,
        value: response.data[i].city,
      });
    }
    console.log(cities);
  } catch (e) {
    console.error("Error in pulling cities");
  }
};
</script>
<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}
div#app div#login div#form4 {
  background-color: lightseagreen;
  border-radius: 10px;
  color: #ecf0f1;
  box-shadow: 0px 0px 30px 0px #666;
  width: 50%;
  padding: 35px;
}

div#login div#form3 {
  background-color: #34495e;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #ecf0f1;
  box-shadow: 0px 0px 30px 0px #666;
  width: 50%;
  padding: 35px;
}

div#app div#login div#form3 label,
div#app div#login div#form3 input,
div#app div#login div#form2 label,
div#app div#login div#form2 input {
  outline: none;
  width: 100%;
}

div#app div#login div#form3 label {
  color: #95a5a6;
  font-size: 0.8em;
}
div#app div#login div#form2 label {
  color: #34495e;
  font-size: 0.9em;
}
div#app div#login div#form4 label {
  color: #34495e;
  font-size: 0.9em;
}
div#app div#login div#form3 input {
  background-color: transparent;
  border: none;
  color: #34495e;
  font-size: 0.8em;
  margin-bottom: 20px;
}
div#app div#login div#form2 input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;

  font-size: 1.2em;
  margin-bottom: 20px;
}
div#app div#login div#form3 ::placeholder,
div#app div#login div#form2 ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form3 button,
div#app div#login div#form2 button {
  background-color: #eadfdf;
  color: #000;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form3 button:hover,
div#app div#login div#form2 button:hover {
  color: #ecf0f1;
  background-color: #381e1e;
}

div#app div#login div#form2 {
  background-color: lightseagreen;
  border-radius: 10px;
  color: #ecf0f1;
  box-shadow: 0px 0px 30px 0px #666;
  width: 50%;
  padding: 35px;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

div#app {
  width: 100%;
  height: 100%;
}

div#app div#login {
  align-items: center;
  background-color: darkcyan;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
  text-align: center;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: lightseagreen;
  border-radius: 1000px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 100%;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  margin: 10x;
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder,
label {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form button {
  background-color: #eadfdf;
  color: #000;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form button:hover {
  color: #ecf0f1;
  background-color: #381e1e;
}

@media screen and (max-width: 100%) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 2px;
    width: 100%;
  }
}
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
