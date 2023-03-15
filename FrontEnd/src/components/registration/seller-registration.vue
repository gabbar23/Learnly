<template>
  <div id="app">
    <div id="login2">
      <div id="form2">
        <FormKit
          type="form"
          @submit="sellerRegister"
          enctype="multipart/form-data"
        >
          <section class="container parent_sect">
            <FormKit
              type="text"
              label="First Name"
              v-model="userDetails.firstName"
              style="color: black"
              validation="required|alpha"
            />

            <FormKit
              type="text"
              label="Last Name"
              v-model="userDetails.lastName"
              style="color: black"
              validation="required|alpha"
            />

            <FormKit
              type="tel"
              label="Phone Number"
              v-model="userDetails.phone"
              style="color: black"
              validation="required|number|length:10,10"
              validation-visibility="dirty"
            />

       <FormKit type="date" 
       label="Date of birth"  
       style="color: black;"
       validation="required"
        />     


            <FormKit
              type="text"
              label="Address"
              v-model="userDetails.address"
              style="color: black"
              validation="required"
            />

            <FormKit
              type="select"
              label="State"
              placeholder="Select a State"
              :options="states"
              v-model="userDetails.provinceName"
              validation="required"
              @change="triggerChange(userDetails.provinceName)"
            >
            </FormKit>

            <FormKit
              type="select"
              label="City"
              placeholder="Select City"
              :options="cityOptions"
              validation="required"
              v-model="userDetails.cityName"
            ></FormKit>

            <FormKit
              type="text"
              label="Postal Zip Code"
              help="format: a1b-c2d | a1bc2d | a1b c2d"
              :validation="[
                ['required'],
                [
                  'matches',
                  /^\w\d\w \w\d\w$/,
                  /^\w\d\w-\w\d\w$/,
                  /^\w\d\w\w\d\w$/,
                ],
              ]"
              v-model="userDetails.postalCode"
              style="color: black"
            />

            <FormKit
              id="fileUpload"
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
              type="email"
              label="Email"
              v-model="userDetails.email"
              @blur="checkUserExists(userDetails.email)"
              validation="required|email"
              style="color: black"
            />
            <div class="error" v-if="isUserAlreadyRegistered">
              User Already Registered.
            </div>
            <br />

            <FormKit
              type="password"
              name="password"
              validation="required"
              label="Password"
              placeholder="Password"
              v-model="userDetails.password"
              style="color: black"
            />

            <FormKit
              type="password"
              name="password_confirm"
              validation="required|confirm"
              label="Confirm Password"
              placeholder="Re-Enter Password"
              style="color: black"
            />

            <FormKit
              type="checkbox"
              label="Terms and Conditions"
              help="Do you agree to our terms of service?"
              name="terms"
              validation="accepted"
              :value="false"
              v-model="userDetails.termsCondition"
            />
            <FormKit
              type="checkbox"
              label="Register as Buyer/Seller or Both"
              name="terms"
              :options="['buyer', 'seller']"
              validation="required"
              v-model="buyerSeller"
              @input="
                checkIsBuyerIsSeller(userDetails.isSeller, userDetails.isBuyer)
              "
            />
          </section>
        </FormKit>
      </div>
    </div>
    <section>
      <div id="app2">
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
  </div>
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
import type { error, FormKitProps, register } from "@formkit/core";
import { fa, tr } from "@formkit/i18n";
import { email, label, options, selectInput, submit } from "@formkit/inputs";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useNotification } from "@kyvg/vue3-notification";

const states = ref<ISelectResponse<string>[]>([]);
const cities = ref<ISelectResponse<string>[]>([]);
let cityOptions = computed(() => {
  return cities.value.map((city) => {
    return {
      label: city.label,
      value: city.value,
    };
  });
});
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
  photoDetail: undefined,
  postalCode: "",
  dateOfBirth: new Date(),
  age: null,
  isBuyer: false,
  isSeller: false,
  isVerified: true,
  gender: "male",
});
const { notify } = useNotification();

let buyerSeller = ["", ""];
const isUserAlreadyRegistered = ref<boolean>(false);
onMounted(async () => {
  try {
    //await AuthService.getUploadImage();
    let response = await AuthService.getStates();
    states.value = [];
    console.log(states);
    for (let i = 0; i < response.data.length; i++) {
      console.warn(response.data[i].province_name);
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
/*const buyerPage = () => {
  router.push("/buyer-details");
};
*/

const sellerRegister = async (data: any) => {
  userDetails.age = 20;
  console.log(data);
  const body = new FormData();
  // Finally, we append the actual File object(s)
  data.idproof.forEach((fileItem: any) => {
    console.warn(fileItem);
    body.append("image", fileItem.file);
  });

/*  for (const value of body.values()) {
    console.error(value);
  }

  for (var key of body.entries()) {
    console.log(key[0] + ", " + key[1]);
  } */

  userDetails.photoDetail = body;
  console.warn(body);
  console.warn(userDetails.photoDetail);
  const headerConfig = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  try {
    await AuthService.uploadImage(body, headerConfig);
    await AuthService.register(userDetails);
    notify({
      title: "Success!",
      text: "User Logged In Successfully! Wait for Admins approval",
      type: "success",
    });
  } catch (e) {
    notify({
      title: "Failure!",
      text: "Registration Failed! Please Contact Help Desk.",
      type: "error",
    });
  }
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
    //console.log("TEst");
  } catch {
    console.error("Error in checking user existence");
  }
};
const checkIsBuyerIsSeller = async (val: any, val2: any) => {
  if (buyerSeller.length == 0) {
    userDetails.isBuyer = false;
    userDetails.isSeller = false;
  }
  if (buyerSeller.length == 2) {
    userDetails.isSeller = true;
    userDetails.isBuyer = true;
  } else if (buyerSeller.length == 1) {
    if (buyerSeller[0] == "buyer") {
      userDetails.isBuyer = true;
      userDetails.isSeller = false;
    }
    if (buyerSeller[0] == "seller") {
      userDetails.isSeller = true;
      userDetails.isBuyer = false;
    }
  }
  //console.log(buyerSeller)
  //console.log(userDetails.isBuyer)
  //console.log(userDetails.isSeller)
};

const triggerChange = async (val: string) => {
  console.warn(val);
  cities.value = [];
  try {
    let response = await AuthService.getCities(val);
    //  console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      cities.value.push({
        label: response.data[i].city,
        value: response.data[i].city,
      });
    }
    console.log(cityOptions);
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

#app,
#app2 {
  width: 100%;
  height: 100%;
  background-color: #eadfdf;
}

#app2 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eadfdf;
}

#app #login2,
#app #login2 #form2 {
  width: auto;
  height: auto;
  background-color: #eadfdf;
}

#app #login2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app #login2 #form2 {
  width: 1000px;
  padding: 35px;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: black;
  background-color: #eadfdf;
}

#app2 #form {
  width: 260px;
  padding: 35px;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: black;
  justify-content: flex-end;
  background-color: #34495e;
}

#app2 #form label {
  color: black;
  font-size: 0.8em;
}

#app #login2 #form2 label,
#app #login2 #form2 input {
  outline: none;
  width: 100%;
  color: #000;
}

#app #login2 #form2 label {
  color: black;
  font-size: 0.8em;
}

#app #login2 #form2 input {
  background-color: transparent;
  border: none;
  color: transparent;
  font-size: 1em;
  margin-bottom: 15px;
}

#app #login2 #form2 form::placeholder,
#app #login2 #form2 select {
  color: black;
  opacity: 1;
}

#app #login2 #form2 button,
#app2 #form button {
  background-color: whitesmoke;
  color: #000;
  cursor: pointer;
  border: none;
  padding: 15px;
  transition: background-color 0.2s ease-in-out;
  margin-left: 25px;
  width: 75%;
}

#app #login2 #form2 button:hover,
#app2 #form button:hover {
  color: #ecf0f1;
  background-color: #381e1e;
}

@media screen and (max-width: 600px) {
  #app #login2 {
    align-items: unset;
    background-color: #eadfdf;
    display: unset;
    justify-content: unset;
  }

  #app #login2 #form2 {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
    color: black;
  }

  #app #login2 #form2 form {
    margin: 0 auto;
    max-width: min-content;
    width: 100%;
  }

  .parent_sect {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
