<template>
  <h1>Latest Homepage</h1>
  <loader v-if="isLoading"></loader>
  <template v-else>
    <Carousel
      id="gallery"
      :items-to-show="1"
      :wrap-around="false"
      v-model="currentSlide"
    >
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
        <div class="carousel__item" @click="slideTo(slide - 1)">
          {{ slide }}
        </div>
      </Slide>
    </Carousel>

    <h3>Blind Bid</h3>

    <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">{{ slide }}</div>
      </Slide>

      ...
    </Carousel>

    <h3>Simple sell</h3>

    <!-- <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    ...
  </Carousel> -->
    <h1></h1>
    <Carousel>
      <template v-if="simpleSellAuctionDetails.imageDetails.length > 0">
        <Slide
          v-for="(item, index) in simpleSellAuctionDetails.imageDetails"
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
  </template>
</template>

<script lang="ts" setup>
import { Carousel, Slide } from "vue3-carousel";
import type {
  IPostBidDetails,
  IGetAuctionItemDetails,
  IGeneralAuctionDetails,
} from "@/interfaces/auction";
import { onMounted, reactive, ref } from "vue";
import auctionService from "@/services/auctionService";
import  Loader  from "../components/loader.vue";


const currentSlide = ref<Number>(0);

const slideTo = (val: any) => {
  currentSlide.value = val;
};

const bindClick = (args: any) => {
  console.log("Hello");
};
// let auctionDetails = reactive<IPostBidDetails>({
//   itemName: "",
//   startTime: new Date(),
//   endTime: new Date(),
//   startPrice: "",
//   provinceName: "",
//   cityName: "",
//   postalCode: "",
//   address: "",
//   itemDes: "",
//   imageDetails: [],
//   bidType: "",
//   isSold: 0,
//   startDate: new Date(),
//   endDate: new Date(),
// });
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

const auctionDetails = reactive<any>({});

const blindAuctionDetails = ref<any>([]);
const simpleSellAuctionDetails = ref<IGeneralAuctionDetails>({
  imageDetails: [],
  auctionId: null,
  auctionType: "",
  itemId: null,
  itemName: "",
});
const liveAuctionDetails = ref<any>([]);
const isLoading = ref<boolean>(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await auctionService.getAllBidDetails();
    let allAuctionDetails = response.data.details.map((auction) => {
      return {
        auctionId: auction.auctionId,
        auctionType: auction.auctionType,
        ...auction.items[0],
      };
    });

    blindAuctionDetails.value = allAuctionDetails.filter(
      (auction) => auction.auctionType == "blind"
    );
    simpleSellAuctionDetails.value = allAuctionDetails.filter(
      (auction) => auction.auctionType == null
    );
    liveAuctionDetails.value = allAuctionDetails.filter(
      (auction) => auction.auctionType == "live"
    );
    console.log(blindAuctionDetails.value);
    console.log(simpleSellAuctionDetails.value);

    console.log(liveAuctionDetails.value);
  } catch (e) {
    console.log("Error occured");
  } finally {
    isLoading.value = false;
  }
});
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
