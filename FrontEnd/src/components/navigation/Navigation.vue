<template>
  <nav class="navbar navbar-expand-lg row background mb-4">
    <div class="col-md-11 col-sm-8 col-xs-8">
      <h1>Bid4Good</h1>
    </div>
    <div class="col-sm-4 col-xs-4">
      <!-- <a class="nav-link ml-auto" href="/">Home </a> -->
      <div class="col-sm-4 col-xs-4">
        <button class="btn btn-outline-dark" @click="logout">
          <font-awesome-icon icon="sign-out-alt" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import router from "@/router";
import { computed } from "vue";

const hideLogOutIcon = computed((router) => {
  console.warn(router.currentRoute.value);
  return false;
});

const logout = () => {
  console.log("LogOUt");
};
</script>
<style>
.background {
  background-color: aquamarine;
}
</style>
