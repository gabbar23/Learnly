<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section>
    <FormKit type="button" :ignore="false" @click="buyerPage()">
      Register as Buyer
    </FormKit>
  </section>
    <FormKit type="form" @submit="sellerRegister()">
      
      <section class="container parent_sect">
        
    <FormKit type="text" label="First Name" validation="required|alpha" />

    <FormKit type="text" label="Last Name" validation="required|alpha" />

    <FormKit type="email" label="Email" validation="required|email" />

    <FormKit type="number" label="Phone Number" validation="required|number" />

    <FormKit type="text" label="Name Of Offering" validation="required|alpha" />

    <FormKit type="number" label="Estimated Value" validation="required|number" />

    <FormKit type="text" label="Address Line 1" validation="required|alpha" />

    <FormKit type="text" label="Address Line 2" validation="required|alpha" />

    <FormKit
      type="select"
      label="Select City"
      :options="[]"
      validation="required|alpha"
    />

    <FormKit 
      type="select"
      label="State"
      placeholder="Select a State"
      validation="required|alpha"
    >
  <optgroup label="States">
    <option v-for="state in stateOptions" value={{state.province}}>{{state.province}}</option>
  </optgroup>
    </FormKit>

    <FormKit type="text"
            label="Postal Zip Code"
            :validation="[
              ['required'],
              [
                'matches',
                /^\w\d\w \w\d\w$/,
                /^\w\d\w-\w\d\w$/,
                /^\w\d\w\w\d\w$/,
              ],
            ]"
            help="format: a1b-c2d | a1bc2d | a1b c2d"/>

    
    <FormKit 
        type="file" 
        label="Photo of Government ID" 
        validation="required" 
        accept=".pdf,.jpg,.jpeg,.png"
        help="Upload a goverment approved ID such as Driving License or Passport. 
        Only .pdf,.jpg,.jpeg,.png files allowed"
        />

    <FormKit type="textarea" label="Description" validation="required|alpha" />

    <FormKit
      type="checkbox"
        label="Terms and Conditions"
        help="Do you agree to our terms of service?"
        name="terms"
        :value="false"
        validation="accepted"
        validation-visibility="dirty"
    />
  </section>

  </FormKit>
    <FormKit type="button" :ignore="false" @click="login()">
      Already have an account? Sign In!
    </FormKit>
  
</template>
<script lang="ts">
import { validation } from "@/constants";
import router from "@/router";
import AuthService from '@/services/AuthService'
import type { register } from "@formkit/core";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  mounted(){

    setTimeout(()=>{
      AuthService.getStates()
      .then((result)=> {
        this.stateOptions= result.data
      })
      .catch(()=>console.log("could not fetch."));
    },100);
  },
  data() {
    return {
      stateOptions:new Array<any>
    };
  },
  props: {
    headerText: {
      type: String,
      default: "header",
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    options: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  watch:{
    state(value){

    }
  },
  setup(props) {},
  methods: {
    login() {
      router.push("/login");
    },
    buyerPage(){
      router.push("/buyer-details");
    },

    async sellerRegister() {

      const response = await AuthService.register({});

      console.log("worked");

      // router.push("/login");
    },
    selectMade() {
      console.warn("SELECT MADE HIT");
    },
  },
});
</script>
<style>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>