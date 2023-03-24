<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="login">
    <div id="form4">
      <FormKit type="form" @submit="login" enctype="multipart/form-data">
        <section class="container parent_sect">
          <FormKit type="text" label="First Name" validation="required|alpha" />

          <FormKit type="text" label="Last Name" validation="required|alpha" />

          <FormKit
            type="number"
            label="Phone Number"
            validation="required|number"
          />
          <FormKit type="date" label="Date of birth" />

          <FormKit
            type="text"
            label="Address"
            validation="required|alphanumeric"
          />
          <!--
      <FormKit
        type="text"
        label="Address Line 2"
        validation="required|alphanumeric"
      />
-->
          <FormKit
            type="select"
            label="Select City"
            :options="[]"
            validation="required|alpha"
          />

          <FormKit
            type="select"
            label="State"
            :options="[]"
            validation="required|alpha"
          />

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

          <!--    <FormKit
        type="file"
        label="Photo of Government ID"
        validation="required"
        accept=".pdf,.jpg,.jpeg,.png"
        help="Upload a goverment approved ID such as Driving License or Passport. 
        Only .pdf,.jpg,.jpeg,.png files allowed"
      />

      -->
          <FormKit
            type="textarea"
            label="Description"
            validation="required|alpha"
          />
          <br />

          <FormKit
            type="checkbox"
            label="Terms and Conditions"
            help="Do you agree to our terms of service?"
            name="terms"
            :value="false"
            validation="accepted"
            validation-visibility="dirty"
          />
          <br />

          <!--  @blur="checkUserExists(userDetails.email)"-->
          <FormKit type="email" label="Email" />
          <br />
          <FormKit
            type="password"
            label="Password"
            validation="required|email"
          />

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
        <h1 class="align_center">OR</h1>
        <FormKit type="button" :ignore="false" @click="SellerRegistration()">
          Register as Seller
        </FormKit>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    return {};
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
    login() {
      router.push("/");
    },
    SellerRegistration() {
      router.push("/reg-seller");
    },
  },
});
</script>
<style scoped>


.side-bar > div {
  cursor: pointer;
  border: 1px solid;
}
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.main {
  display: grid;
  grid-template-columns: 20% 80%;
}
</style>
