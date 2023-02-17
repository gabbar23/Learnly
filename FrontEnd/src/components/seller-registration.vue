<!-- eslint-disable vue/require-v-for-key -->
<template>
  <section class="container parent_sect">
    <FormKit type="text" label="First Name" validation="required|alpha" />

    <FormKit type="text" label="Last Name" validation="required|alpha" />

    <FormKit type="email" label="Email" validation="required|email" />

    <FormKit type="number" label="Phone Number" validation="required|alpha" />

    <FormKit type="text" label="Name Of Offering" validation="required|alpha" />

    <FormKit type="number" label="Estimated Value" validation="required" />

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

    <FormKit type="text" label="Postal Zip Code" validation="required|alpha" />

    

    <FormKit type="file" label="Upload Photos" validation="required" />

    <FormKit type="textarea" label="Description" validation="required|alpha" />

    <FormKit
      type="checkbox"
      label="Terms and Conditions"
      name="terms"
      :value="false"
      validation="accepted"
      validation-visibility="dirty"
    />
  </section>
  <div class="text-center">
    <button type="submit" class="btn btn-primary">Submit</button>
    <FormKit type="form" @submit="sellerRegister()">
      <div class="row col-md-12">
        <div class="col-md-4">
          <FormKit type="text" label="First Name" validation="required|alpha" />
        </div>
        <div class="col-md-4">
          <FormKit type="text" label="Middle Name" />
        </div>
        <div class="col-md-4">
          <FormKit type="text" label="Last Name" validation="required|alpha" />
        </div>
      </div>

      <div class="row col-md-12">
        <div class="col-md-4">
          <FormKit type="date" label="Date of Birth" validation="required" />
        </div>
        <div class="col-md-4">
          <FormKit
            type="radio"
            label="Buyer/Seller"
            :options="['Buyer', 'Seller']"
            validation="required"
            
          />
        </div>
      </div>

      <div class="row col-md-12">
        <div class="col-md-4">
          <FormKit
            type="text"
            label="Address Line 1"
            validation="required"
            help="Street Name and Apartment Name"
          />
        </div>
        <div class="col-md-4">
          <FormKit type="text" label="Address Line 2" help="Unit number" />
        </div>
      </div>
      <div class="row col-md-12">
        <div class="col-md-4">
          <FormKit type="text" label="City" validation="required|alpha" />
        </div>

        <div class="col-md-4">
          <FormKit
            v-model="stateOptions"
            id="state"
            type="select"
            name="province"
            label="Province/State"
            validation="required"
      
          >
          <optgroup label="States">
            <option v-for="state in stateOptions" value={{state.province}}>{{state.province}}</option>
          </optgroup>
          </FormKit>
        </div>
        <div class="col-md-4">
          <FormKit
            type="text"
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
            help="format: a1b-c2d | a1bc2d | a1b c2d"
          />
        </div>
      </div>
      <FormKit
        type="text"
        name="email"
        id="email"
        validation="required|email"
        label="Email"
        placeholder="abc@abc.com"
      />
      <FormKit
        type="password"
        name="password"
        validation="required"
        label="Password"
        placeholder="Password"
      />
      <FormKit
        type="password"
        name="password_confirm"
        validation="required|confirm"
        label="Confirm Password"
        placeholder="Re-Enter Password"
      />
      <FormKit
        type="file"
        label="Photo of Government ID"
        accept=".pdf,.jpg,.jpeg,.png"
        help="Upload a goverment approved ID such as Driving License or Passport"
        validation="required"
      />

      <FormKit
        type="checkbox"
        label="Terms and Conditions"
        help="Do you agree to our terms of service?"
        name="terms"
        :value="false"
        validation="accepted"
        validation-visibility="dirty"
      />
    </FormKit>

    <FormKit type="button" :ignore="false" @click="login()">
      Already have an account? Sign In!
    </FormKit>
  </div>
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
      stateOptions:new Array<object>
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

    async sellerRegister() {

      const response = await AuthService.register({});

      console.log("worked");

      // router.push("/login");
    },
    selectMade() {
      console.warn("SELECT mADE HIT");
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
