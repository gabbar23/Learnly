<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-section w-50 mx-auto m-2">
    <h3>Simple Sell</h3>
    <Carousel>
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item" @click="bindClick(slide)">{{ slide }}</div>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <div class="mx-auto">
      <button class="btn btn-danger" @click="makePayment">Pay</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import router from "@/router";

const bindClick = (args: any) => {
  console.log("Hello");
};

const makePayment = () => {
  // console.log();
  router.push({
    path: "/add-card",
    query: {
      sellerId: "123",
      itemId: "456",
      buyerId: "789",
    },
  });
};
</script>

<style>
.main-section {
  border: 1px solid;
  width: 50vw;
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: green;
  color: white;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
