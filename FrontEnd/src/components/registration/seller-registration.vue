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
          />

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
        :options="cityOptions"
        v-model="userDetails.cityName"
      ></FormKit>

          <FormKit
            type="text"
            label="Postal Zip Code"
            help="format: a1b-c2d | a1bc2d | a1b c2d"
            v-model="userDetails.postalCode"
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
          />
          <div class="error" v-if="isUserAlreadyRegistered">
            User Already Registered.
          </div>
          <br />

          <FormKit type="password" label="Password" v-model="userDetails.password" />

          <FormKit type="password" label="Confirm Password" />

          <FormKit
            type="checkbox"
            label="Terms and Conditions"
            help="Do you agree to our terms of service?"
            name="terms"
            :value="false"
            v-model="userDetails.termsCondition"
          />
          <FormKit
            type="checkbox"
            label="Register as Buyer/Seller or Both"
            name="terms"
            :options="['buyer','seller']"
            v-model="buyerSeller"
            ${section}-i
            @input="checkIsBuyerIsSeller(userDetails.isSeller,userDetails.isBuyer)"
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
import type { FormKitProps, register } from "@formkit/core";
import { fa, tr } from "@formkit/i18n";
import { label, options, selectInput } from "@formkit/inputs";
import { computed, defineComponent, onMounted, reactive, ref, watch } from "vue";
const states = ref<ISelectResponse<string>[]>([]);
const cities = ref<ISelectResponse<string>[]>([]);
let cityOptions = computed(() => {
      return cities.value.map(city => {
        return {
          label: city.label,
          value: city.value,
        }
      })
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
  photoDetail:undefined,
  postalCode: "a1b-c2d",
  dateOfBirth: new Date(),
  age: null,
  isBuyer:false,
  isSeller:false,
  isVerified:true,
  gender:"male",
  
});
let buyerSeller=["",""];
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
const checkIsBuyerIsSeller=async(val:any,val2:any)=>{
  if(buyerSeller.length==0)
  {
    userDetails.isBuyer=false;
    userDetails.isSeller=false;
  }
if(buyerSeller.length==2){
userDetails.isSeller=true;
userDetails.isBuyer=true;
}
else if(buyerSeller.length==1){
if(buyerSeller[0]=="buyer"){
  userDetails.isBuyer=true;
  userDetails.isSeller=false;
}
if(buyerSeller[0]=="seller"){
  userDetails.isSeller=true;
  userDetails.isBuyer=false;
}}
console.log(buyerSeller)
console.log(userDetails.isBuyer)
console.log(userDetails.isSeller)
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
      console.log(cityOptions)
  }
    catch (e) {
    console.error("Error in pulling cities");
  }
};

</script>
<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}


div#app {
  width: 100%;
  height: 100%;
  background-color: #eadfdf;
}
div#app2{
  width: 100%;
  height: 100%;
justify-content: center;
background-color: #eadfdf;
display: flex;
}

div#app div#login2 {
  align-items: center;
  background-color: #eadfdf;
  display:flex;
  justify-content:center;
  width:auto;
  height:auto;
}

div#app2 div#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #eadfdf;
  justify-content:flex-end;
  width: 260px;
  padding: 35px;
}

div#app2  div#form label,
div#app2  div#form input {
  outline: none;
  width: 100%;
}
div#app2 div#form label {
  color: #eadfdf;
  font-size: 0.8em;
}

div#app div#login2 div#form2 {
  background-color: teal;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #eadfdf;
  width:900px;
  padding: 35px;
}

div#app div#login2 div#form2 label{
  outline: none;
  width: 100%;
}

div#app div#login2 div#form2 label {
  color: #eadfdf;
  font-size: 0.8em;
}

div#app div#login2 div#form2 input {
  background-color: transparent;
  border: none;
  color:#eadfdf;
  font-size: 1em;
  margin-bottom: 15px;
}
[data-type="checkbox"] .formkit-input ~ .formkit-decorator, [data-type="radio"] .formkit-input ~ .formkit-decorator  {
  color: var(--fk-color-primary);
}
#input_15 > ul > li:nth-child(1) > label > div > span > span > svg > polygon{
  color:#eadfdf;
}
#input_15 > ul > li:nth-child(2) > label > div > span > span > svg > polygon{
  color: #eadfdf;
}


div#app div#login2 div#form2 form ::placeholder,
div#app div#login2 div#form2 select  {
  color: #eadfdf;
  opacity: 1;
}

div#app div#login2 div#form2 button {
  background-color: #eadfdf;
  color: #000;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 75%;
}

div#app div#login2 div#form2 button:hover {
  color: #ecf0f1;
  background-color: #381e1e;
}

@media screen and (max-width: 600px) {
  div#app div#login2 {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }


  div#app div#login2 div#form2 {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login2 div#form2 form {
    margin: 0 auto;
    max-width: min-content;
    width: 100%;
  }
  div#app div#login2 div#form2 {
    color: #eadfdf;
    
  }
  
.parent_sect {
  display: grid;
  grid-template-columns: 
  1fr 1fr;
}
}
</style>
