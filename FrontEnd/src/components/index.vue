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
      :options="cities"
      validation="required|alpha"
    />

    <FormKit
      type="select"
      label="State"
      :options="states"
      validation="required|alpha"
    />

    <FormKit type="text" label="Postal Zip Code" validation="required|alpha" />

    

    <FormKit type="file" label="Upload Photos" validation="required" />

    <FormKit type="textarea" label="Description" validation="required|alpha" />

    <!-- <div class="form-group">
        <div class="form-group">
            <label for="formGroupExampleInput">Name of Offering</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
        </div>
    </div>
    <div class="form-group">
        <div class="form-group">
            <label for="formGroupExampleInput">Estimated value</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
        </div>
    </div> -->

    <!-- <div class="custom-file">
  <input type="file" class="custom-file-input" id="customFile">
  <label class="custom-file-label" for="customFile">Choose file</label>
</div> -->
    <FormKit
      type="checkbox"
      label="Terms and Conditions"
      name="terms"
      :value="false"
      validation="accepted"
      validation-visibility="dirty"
    />
    <!-- <div class="form-group">
        <div class="form-group">
            <label for="formGroupExampleInput">Description</label>
            <textarea class = "form-control"></textarea>
        </div>
    </div> -->
  </section>
  <div class="text-center">
    <button type="submit" class="btn btn-primary">Submit</button>
    <FormKit type="form" @submit="route">
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
            type="select"
            name="province"
            label="Province/State"
            validation="required"
            :options="[
              { label: 'Select Province', value: null },
              { label: 'Nova Scotia', value: 'NS' },
              { label: 'Ontario', value: 'ON' },
              { label: 'Quebec', value: 'QC' },
            ]"
          />
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

    <FormKit type="button" :ignore="false" @click="loginRedirect">
      Already have an account? Sign In!
    </FormKit>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    return {
      states: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon",
      ],
      cities: [{ place: "Halifax" }, { place: "DartMouth" }],
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
  setup(props) {},
  methods: {
    route() {
      router.push("/login");
    },
    loginRedirect() {
      router.push("/login");
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
