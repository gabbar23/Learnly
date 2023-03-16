<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-section w-50 mx-auto m-2">
    <h3>Simple Sell {{ sellItemDetail.imageDetails }}</h3>
    <Carousel>
      <template v-if=" sellItemDetail.imageDetails.length > 0">
        <Slide
          v-for="(item, index) in sellItemDetail.imageDetails"
          :key="index"
        >
          <!-- <div class="carousel__item" @click="bindClick(slide)">
            {{ slide }}
          </div> -->
          <!-- https://bidforgood.s3.ca-central-1.amazonaws.com/Screenshot%202023-03-11%20at%2012.01.28%20AM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4C5UR2PMKV2ZI2EO%2F20230315%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230315T222516Z&X-Amz-Expires=604800&X-Amz-Signature=543ed9164015d75afe858034973c5d95d72726680916158ca9d6ef4adfc554ae&X-Amz-SignedHeaders=host&x-id=GetObject -->
          <img
            :src="item.imgUrl"
            class="carousel__item"
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
    <div class="mx-auto">
      <button class="btn btn-danger" @click="makePayment">Pay</button>
    </div>
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

const route = useRoute();
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
});

const imageDetails = [
  {
    imgId: 5,
    imgDescription: "test",
    imgName: "Screenshot 2023-03-11 at 8.36.11 PM.png",
    imgUrl:
      "https://bidforgood.s3.ca-central-1.amazonaws.com/Screenshot%202023-03-11%20at%208.36.11%20PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4C5UR2PMKV2ZI2EO%2F20230315%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230315T222515Z&X-Amz-Expires=604800&X-Amz-Signature=23227afd7d2a2e4dee0baea728120ffe5d2725c88272154e9858292f5229a7e9&X-Amz-SignedHeaders=host&x-id=GetObject",
    itemId: 11,
  },
  {
    imgId: 6,
    imgDescription: "test",
    imgName: "Screenshot 2023-03-11 at 12.01.28 AM.png",
    imgUrl:
      "https://bidforgood.s3.ca-central-1.amazonaws.com/Screenshot%202023-03-11%20at%2012.01.28%20AM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4C5UR2PMKV2ZI2EO%2F20230315%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230315T222516Z&X-Amz-Expires=604800&X-Amz-Signature=543ed9164015d75afe858034973c5d95d72726680916158ca9d6ef4adfc554ae&X-Amz-SignedHeaders=host&x-id=GetObject",
    itemId: 11,
  },
];

onMounted(async () => {
  const { itemId } = route.query;
  const response = await auctionService.getItemDetails(11);
  sellItemDetail = response.data;
  // await auctionService.getAuctionDetails(11);
});

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
