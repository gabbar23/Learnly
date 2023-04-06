<template>
  <nav class="navbar navbar-expand-lg row background mb-4 w-105">
    <div class="col-9">
      <h1>Bid4Good</h1>
    </div>
    <!-- <a class="nav-link ml-auto" href="/">Home </a> -->
    <!-- <div class = "d-flex col-8">   2/8/2
      <a class="nav-link m-2" @click = "navigateTo('blindBid')" href="javascript:void"> Blind Bid </a>
      <a class="nav-link m-2" href="javascript:void"> Simple Sell </a>
    </div> -->
    <div class = "col-6">
      <button
        class="btn btn-outline-dark m-2"
        @click="navigateTo('home')"
        v-if="!showLogOutIcon"
      >
        <font-awesome-icon icon="house" />
      </button>
      <button
        class="btn btn-outline-dark m-2"
        @click="navigateTo('postbid')"
        v-if="!showLogOutIcon && isSeller==true"
      >
        <font-awesome-icon icon="gavel" />
      </button>
      <button
        class="btn btn-outline-dark m-2"
        @click="navigateTo('wishlist')"
        v-if="!showLogOutIcon && isBuyer==true"
      >
        <font-awesome-icon icon="heart" />
      </button>
      <button
        class="btn btn-outline-dark m-2"
        @click="navigateTo('admin')"
        v-if="userDetails.userId==34 && !showLogOutIcon"
      >
        <font-awesome-icon icon="user-secret" />
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const store = useStore();
const details: any = localStorage.getItem("userDetails");
let userDetails: any = {};
let adminID= userDetails.adminID;
//let isAdmin = ref<boolean>(false);
let isSeller= ref<boolean>(false);
let isVerified = ref<boolean>(false);
let isBuyer = ref<boolean>(false);


if(JSON.parse(details) != null){
  userDetails=JSON.parse(details);
   isSeller = userDetails.isSeller;
  //isAdmin = userDetails.isAdmin;
  isVerified = userDetails.isVerified;
  isBuyer = userDetails.isBuyer;
}

const navigateTo = (navigation: string) => {
  if (navigation == "wishlist") {
    router.push("/wishlist");
  } else if (navigation == "user") {
    router.push("/buyer");
  }
  else if (navigation== "home"){
   // console.log(adminID)
    console.log(JSON.parse(details));
    router.push("/home");
  }
  else if (navigation== "postbid"){
    router.push("/post-bid");
  }
  else if (navigation== "admin"){
    router.push("/admin-dashboard");
  }

};

const showLogOutIcon = computed(
  () =>
    store.state.currentRoute != null && store.state.currentRoute.name == "Login"
);

/*
const isUserAdmin = computed(() => {
  return isAdmin;
});

// const showWishListIcon = computed(
//   () =>
//     store.state.currentRoute != null && store.state.currentRoute.name == "Login"
// );

// const showUserIcon = computed(
//   () =>
//     store.state.currentRoute != null && store.state.currentRoute.name == "Login"
// );

*/
const logout = async () => {
  try {
    const sessionId = store.state.sessionId;
    await AuthService.logOut({ sessionId: sessionId });
    localStorage.clear();
    notify({
      title: "Successful!",
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

.home {
  background: url(../../assets/house-solid.svg) no-repeat top left;
  background-size: 75%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 35px;
  width: 35px;
}
</style>
