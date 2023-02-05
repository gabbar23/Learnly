// eslint-disable-next-line vue/multi-word-component-names

<template>
<FormKit type="form" @submit="route" >
<div class = "row col-md-12">
  <div class = "col-md-4">
  <FormKit
  type="text"
  label="First Name"
  validation="required|alpha"
/>
</div>
<div class = "col-md-4">
<FormKit
  type="text"
  label="Middle Name"
/>
</div>
<div class = "col-md-4">
<FormKit
  type="text"
  label="Last Name"
  validation="required|alpha"
/>
</div>
  </div>

<div class="row col-md-12">
<div class="col-md-4">
  <FormKit
  type="date"
  label="Date of Birth"
  validation="required"
/>
</div>
<div class="col-md-4">

  <FormKit
  type="radio"
  label="Buyer/Seller"
  :options="['Buyer','Seller']"
  validation="required"
  />
</div>
</div>

  <div class = "row col-md-12">
    <div class = "col-md-4">
<FormKit
  type="text"
  label="Address Line 1"
  validation="required"
  help="Street Name and Apartment Name"
/>
</div>
<div class = "col-md-4">
<FormKit
  type="text"
  label="Address Line 2"
  help="Unit number"
/>
</div>

</div>
<div class = "row col-md-12">
  <div class = "col-md-4">
    <FormKit
    type="text"
    label="City"
    validation="required|alpha"
    />
</div>

<div class = "col-md-4">
  <FormKit
    type="select"
    name="province"
    label="Province/State"
    validation="required"
    :options="[ { label:'Select Province',value:null},{label: 'Nova Scotia', value: 'NS' },
  { label: 'Ontario', value: 'ON' },
  { label: 'Quebec', value: 'QC' },]"
  />
</div>
<div class = "col-md-4">
<FormKit
  type="text"
  label="Postal Zip Code"
  :validation="[['required'], ['matches', /^\w\d\w \w\d\w$/, /^\w\d\w-\w\d\w$/,/^\w\d\w\w\d\w$/]]"
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

<FormKit type="button" :ignore="false" @click="loginRedirect">
  Already have an account? Sign In!

</FormKit>



</template>
<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
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
  setup(props) {

  },
  methods:{
  route() {
    router.push('/login')
  },
  loginRedirect(){
    router.push('/login')
  }
}
});
</script>
<style>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
<style>
.parent_sect {
display: grid;
grid-template-columns: 1fr 1fr;
}
</style>