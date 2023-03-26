<template>
  <div class="main-section w-50 mx-auto m-2">
    <loader v-if="isLoading"></loader>
    <template v-else>
      <h3 class="text-center mb-5">Simple Sell</h3>
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

      <div class="row p-3 mt-5">
        <div class="col-4 p-2 font-weight-bold">Name:</div>
        <div class="col-8 p-2">{{ sellItemDetail.itemName }}</div>
        <div class="col-4 p-2 font-weight-bold">Price:</div>
        <div class="col-8 p-2">
          {{
            sellItemDetail.startPrice > 0
              ? sellItemDetail.startPrice + `$`
              : "N/A"
          }}
        </div>
        <div class="w-100"></div>
        <div class="col-4 p-2 font-weight-bold">Description:</div>
        <div class="col-8 p-2 text-wrap">{{ sellItemDetail.itemDes }}</div>
      </div>
      <div class="text-center mt-5">
        <button
          class="btn btn-danger"
          @click="makePayment"
          :disabled="sellItemDetail.isSold"
        >
          Pay
        </button>
      </div>
      <button class="wishlist-svg" @click="wishlist"></button>
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
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
});

const bindClick = (args: any) => {
  console.log("Hello");
};

const wishlist=()=>{
  console.log("wishlist");
}

const makePayment = () => {
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
<style scoped>
.main-section {
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.carousel__item {
  height: 300px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
}

.font-weight-bold {
  font-weight: bold;
}

.wishlist-svg{
  background: url(../../assets/heart-fill-svgrepo-com.svg) no-repeat top left;
    background-size: contain;
    cursor: pointer;
    display: inline-block;
    height: 52px;
    width: 40px;
}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #ff4c4c;
  color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

h3 {
  color: #000000;
}
</style>
