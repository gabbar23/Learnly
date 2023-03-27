<template>
  <nav class="navbar navbar-expand-lg row background mb-4 w-100">
    <div class="col-10">
      <h1>Bid4Good</h1>
    </div>
    <!-- <a class="nav-link ml-auto" href="/">Home </a> -->
    <div class="col-sm-4 col-xs-4">
      <button
        class="btn btn-outline-dark m-2"
        @click="navigateTo('wishlist')"
        v-if="!showLogOutIcon"
      >
        <font-awesome-icon icon="heart" />
      </button>
      <button
        class="btn btn-outline-dark m-2"
        @click="navigateTo('user')"
        v-if="!showLogOutIcon"
      >
        <font-awesome-icon icon="user-circle" />
      </button>
      <button
        class="btn btn-outline-dark m-2"
        @click="logout"
        v-if="!showLogOutIcon"
      >
        <font-awesome-icon icon="sign-out-alt" />
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import router from "@/router";
import AuthService from "@/services/AuthService";
import { computed, onMounted } from "vue";
import { mapGetters, useStore } from "vuex";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const store = useStore();

const navigateTo = (navigation: string) => {
  if (navigation == "wishlist") {
    router.push("/wishlist");
  } else if (navigation == "user") {
    router.push("/buyer");
  }
};

const showLogOutIcon = computed(
  () =>
    store.state.currentRoute != null && store.state.currentRoute.name == "Login"
);

// const showWishListIcon = computed(
//   () =>
//     store.state.currentRoute != null && store.state.currentRoute.name == "Login"
// );

// const showUserIcon = computed(
//   () =>
//     store.state.currentRoute != null && store.state.currentRoute.name == "Login"
// );

const logout = async () => {
  try {
    const sessionId = store.state.sessionId;
    await AuthService.logOut({ sessionId: sessionId });
    localStorage.clear();
    notify({
      title: "Successfull!",
      text: "User Logged Out Successfully!",
      type: "success",
    });
    router.push("/");
  } catch (e) {
    notify({
      title: "Failure!",
      text: "Opps Something went wrong! Please Try Again!",
      type: "error",
    });
  }
};
</script>
<style>
.background {
  background-color: aquamarine;
}
</style>
