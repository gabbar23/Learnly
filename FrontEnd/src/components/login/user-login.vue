<template>
  <FormKit type="form" @submit="route" class="parent_sect">
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
      id="password"
      validation="required"
      label="Password"
      placeholder="Password"
    />
  </FormKit>
  <div>
    <p>Not a Registered User? <router-link to="/reg-buyer">SignUp</router-link></p>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import axios from "axios";
import { FormKit } from "@formkit/vue";
import { defineComponent } from "vue";
export default defineComponent({
  methods: {
    route() {
      router.push("/homepage");
    },
  },
});
</script>
