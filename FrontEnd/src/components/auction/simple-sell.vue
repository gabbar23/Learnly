<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-section w-50 mx-auto m-2">
    <loader v-if="isLoading"></loader>
    <template v-else>
      <h3>Simple Sell</h3>
      <Carousel>
        <template v-if="sellItemDetail.imageDetails.length > 0">
          <Slide
            v-for="(item, index) in sellItemDetail.imageDetails"
            :key="index"
          >
            <img
              :src="item.imgUrl"
              class="carousel__item item_size"
              @click="bindClick(item)"
            />
          </Slide>
        </template>
        <template v-else>
          <Slide v-for="slide in 5" :key="slide">
            <div class="carousel__item" @click="bindClick(slide)">
              {{ slide }}
            </div>
          </Slide>
        </template>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      <div>
        <div class="row p-3">
          <div class="col-2">Name:</div>
          <div class="col-10">{{ sellItemDetail.itemName }}</div>
          <div class="w-100"></div>
          <div class="col-2">Description:</div>
          <div class="col-10">{{ sellItemDetail.itemDes }}</div>
        </div>
        <button
          class="btn btn-danger"
          @click="makePayment"
          :disabled="sellItemDetail.isSold"
        >
          Pay
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import router from "@/router";
import { onMounted, ref, reactive } from "vue";
import auctionService from "@/services/auctionService";
import { useRoute } from "vue-router";
import type { IGetAuctionItemDetails } from "@/interfaces/auction";
import { Loader } from "../component";

const route = useRoute();
const isLoading = ref<boolean>(false);
let sellItemDetail = reactive<IGetAuctionItemDetails>({
  imageDetails: [],
  createdAt: "",
  isSold: false,
  itemDes: "",
  itemId: 0,
  itemName: "",
  startPrice: 0,
  updatedAt: "",
  user_id: 0,
  bidAmount: null,
});
const details = localStorage.getItem("userDetails");
  const { userId } = JSON.parse(details);

onMounted(async () => {
  const { itemId, auctionId, auctionType } = route.query;
  try {
    isLoading.value = true;
    const requestPayload = {
      itemId,
      auctionId,
      auctionType,
      userId,
    };
    const response = await auctionService.getNewItemDetails(requestPayload);
    sellItemDetail = response.data.item;
    // await auctionService.getAuctionDetails(11);
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
});

const bindClick = (args: any) => {
  console.log("Hello");
};

const makePayment = () => {
 
  // console.log();
  router.push({
    path: "/add-card",
    query: {
      sellerId: sellItemDetail.user_id + "",
      itemId: sellItemDetail.itemId + "",
      buyerId: userId,
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

.item_size {
  height: 300px;
}
</style>
