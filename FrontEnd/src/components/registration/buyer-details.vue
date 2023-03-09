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
      <FormKit type="date" label="Date of birth"/>     


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
          ['matches', /^\w\d\w \w\d\w$/, /^\w\d\w-\w\d\w$/, /^\w\d\w\w\d\w$/],
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
      <br/>

      <FormKit
        type="checkbox"
        label="Terms and Conditions"
        help="Do you agree to our terms of service?"
        name="terms"
        :value="false"
        validation="accepted"
        validation-visibility="dirty"
      />
      <br/>
      
      
    <!--  @blur="checkUserExists(userDetails.email)"-->
    <FormKit
        type="email"
        label="Email"
      /> 
      <br/>
      <FormKit type="password" label="Password" validation="required|email" />

      <FormKit type="password" label="Confirm Password" />
    
    </section>
    
    </FormKit>
</div>
</div>

<section>
  <div id="login" >
    <div id="form" >
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
    SellerRegistration(){
      router.push("/reg-seller");
    }
  },
});
</script>
<style>
div#app div#login div#form4 {
  background-color: lightseagreen;
  border-radius:10px;
  color: #ecf0f1;
  box-shadow:0px 0px 30px 0px #666;
  width: 50%;
  padding: 35px;

}

div#login div#form3 {
  background-color: #34495e;
  align-items: center;
  justify-content: center;
  border-radius:10px;
  color: #ecf0f1;
  box-shadow:0px 0px 30px 0px #666;
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
div#app div#login div#form3 input{
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
