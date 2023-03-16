<template>
  <h1>Latest Homepage</h1>
  <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>
  </Carousel>

  <Carousel
    id="thumbnails"
    :items-to-show="4"
    :wrap-around="true"
    v-model="currentSlide"
    ref="carousel"
  >
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item" @click="slideTo(slide - 1)">{{ slide }}</div>
    </Slide>
  </Carousel>

</template>

<script lang="ts" setup>
import { Carousel, Slide } from "vue3-carousel";
import { reactive, ref } from "vue";
import type {
  IPostBidDetails,
  IGetAuctionItemDetails,
} from "@/interfaces/auction";
const currentSlide = ref<Number>(0);

const slideTo = (val: any)=>{
  currentSlide.value = val;
}
let auctionDetails = reactive<IPostBidDetails>({
  itemName: "",
  startTime: new Date(),
  endTime: new Date(),
  startPrice: "",
  provinceName: "",
  cityName: "",
  postalCode: "",
  address: "",
  itemDes: "",
  imageDetails: [],
  bidType: "",
  isSold: 0,
  startDate: new Date(),
  endDate: new Date(),
});
let auctionItemDetails = reactive<IGetAuctionItemDetails>({
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
// let bidDetailsRes = await AuthService.fetchDetails();
// let ItemIdData = await auctionService.getItemDetails(1);
</script>
<style>
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
