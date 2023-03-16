<template>
  <div class="container p-0">
    <div class="card px-4">
      <p class="h8 py-3">Payment Details</p>
      <div class="row gx-3">
        <div class="col-12">
          <div class="d-flex flex-column">
            <p class="text mb-1">Person Name</p>
            <FormKit type="text" />
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex flex-column">
            <p class="text mb-1">Card Number</p>
            <FormKit type="text" placeholder="1234 5678 435678" />
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex flex-column">
            <p class="text mb-1">Expiry</p>
            <FormKit type="text" placeholder="MM/YYYY" />
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex flex-column">
            <p class="text mb-1">CVV/CVC</p>
            <FormKit type="password" placeholder="***" />
          </div>
        </div>
        <div class="col-12">
          <div class="btn btn-primary-card mb-3" @click="approvePayment">
            <span class="ps-3">Make Payment</span>
            <span class="fas fa-arrow-right"></span>
          </div>
        </div>
        <div class="col-12">
          <div class="btn btn-danger-card mb-3" @click="cancelPayment">
            <span class="ps-3">Cancel Payment</span>
            <span class="fas fa-arrow-right"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import auctionService from "@/services/auctionService";
import AuthService from "@/services/AuthService";
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const { notify } = useNotification();
const route = useRoute();

const approvePayment = async () => {
  try {
    const requestPayload = Object.assign({}, { ...route.query });
    await AuthService.createSimpleSellOrder(requestPayload);
    notify({
      title: "Successfull!",
      text: "Your Order has been placed Successfully!",
      type: "success",
    });
  } catch (e) {
    notify({
      title: "Failure!",
      text: "Opps Something went wrong!",
      type: "danger",
    });
  }
};

const cancelPayment = () => {
  notify({
    title: "Failure!",
    text: "Payment Cancelled Redirecting!",
    type: "danger",
  });
  router.push("/home");
};
</script>
<style>
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0c4160;

  padding: 30px 10px;
} */

.card {
  max-width: 500px;
  margin: auto;
  color: black;
  border-radius: 20 px;
}

p {
  margin: 0px;
}

.container .h8 {
  font-size: 30px;
  font-weight: 800;
  text-align: center;
}

.btn.btn-primary-card {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-image: linear-gradient(
    to right,
    #77a1d3 0%,
    #79cbca 51%,
    #77a1d3 100%
  );
  border: none;
  transition: 0.5s;
  background-size: 200% auto;
}

.btn.btn-primary-card:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

.btn.btn-primary-card:hover .fas.fa-arrow-right {
  transform: translate(15px);
  transition: transform 0.2s ease-in;
}

.btn.btn-danger-card {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-image: linear-gradient(
    to right,
    #cf5555 0%,
    #d97d4f 51%,
    #d3c477 100%
  );
  border: none;
  transition: 0.5s;
  background-size: 200% auto;
}

.btn.btn-danger-card:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

.btn.btn-danger-card:hover .fas.fa-arrow-right {
  transform: translate(15px);
  transition: transform 0.2s ease-in;
}

.form-control {
  color: white;
  background-color: #223c60;
  border: 2px solid transparent;
  height: 60px;
  padding-left: 20px;
  vertical-align: middle;
}

.form-control:focus {
  color: white;
  background-color: #0c4160;
  border: 2px solid #2d4dda;
  box-shadow: none;
}

.text {
  font-size: 14px;
  font-weight: 600;
}

::placeholder {
  font-size: 14px;
  font-weight: 600;
}
</style>
