<template>
  <div id="app">
    <div id="login">
      <div id="description">
        <h2>Bid4Good Login</h2>
        <p>
          Welcome!<br />
          Kindly enter your authorized credentials.
        </p>
      </div>
      <div id="form">
        <FormKit type="form" @submit="onSubmit" class="parent_sect" @submit-invalid="loginError">
          <FormKit
            type="text"
            name="email"
            id="email"
            validation="required|email"
            label="Email"
            placeholder="abc@abc.com"
            v-model="loginDetails.email"
          />

          <FormKit
            type="password"
            name="password"
            id="password"
            validation="required"
            label="Password"
            placeholder="Password"
            v-model="loginDetails.password"
          />
        </FormKit>
        <div>
          <p>
            Not a Registered User?
            <router-link to="/reg-seller">SignUp</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuthService from "@/services/AuthService";
import { reactive } from "vue";
import { useNotification } from "@kyvg/vue3-notification";

let loginDetails = reactive<ILoginDetails>({
  email: "",
  password: "",
});
const { notify } = useNotification();


const loginError=async()=>{
  notify({
    title: "Fail!",
    text: "Invalid Credentials!",
    type: "fail",
  });
}
const onSubmit = async () => {
  try {
    const response = await AuthService.checkLogin(loginDetails);
    notify({
    title: "Successfull!",
    text: "Your Login was successful!!",
    type: "success",
  });
    const userDetails = JSON.stringify(response.data.message);
    console.log(userDetails);
    localStorage.setItem("userDetails", userDetails);
    router.push("/home"); // This needs to be updated

  } catch (e) {
    console.error("Something went wrong while logging in Please try again.");
    notify({
      title: "Failure!",
      text: "Invalid Credentials",
      type: "error",
    });
  }
};
</script>
<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
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
  background-color: #eadfdf;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: whitesmoke;
  width: 280px;
  padding: 35px;
  text-align: center;
  align-items: center;
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
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 260px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
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

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form button {
  background-color: #ecf0f1;
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

@media screen and (max-width: 600px) {
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
    max-width: 280px;
    width: 100%;
  }
}
</style>
<script lang="ts">
import router from "@/router";
import { errorHandler, FormKit } from "@formkit/vue";
import { defineComponent } from "vue";
import type { ILoggedInUserDetails, ILoginDetails } from "@/interfaces/bid-for-good";
export default defineComponent({
  methods: {
    route() {
      router.push("/homepage");
    },
  },
});
</script>
