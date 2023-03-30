<template>
  <loader v-if="isLoading"></loader>
  <template v-else>
    <Carousel
      id="gallery"
      :items-to-show="1"
      :wrap-around="false"
      v-model="currentSlide"
    >
      <Slide v-for="(item, index) in liveAuctionDetails" :key="index">
        <img
          :src="item.imgUrl"
          class="carousel__item item_size"
          @click="liveAuctionClicked(item)"
        />
      </Slide>
    </Carousel>
    <Carousel
      id="thumbnails"
      :items-to-show="liveAuctionDetails.length"
      :wrap-around="true"
      v-model="currentSlide"
      ref="carousel"
    >
      <Slide v-for="(item, index) in liveAuctionDetails" :key="index">
        <img
          :src="item.imgUrl"
          class="carousel__item item_size"
          @click="slideTo(index - 1)"
        />
      </Slide>
    </Carousel>

    <h3>Blind Bid</h3>
    <Carousel>
      <Slide v-for="(item, index) in blindAuctionDetails" :key="index">
        <img
          :src="item.imgUrl"
          class="carousel__item item_size"
          @click="blindAuctionClicked(item)"
        />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <h3>Simple sell</h3>

    <Carousel>
      <Slide v-for="(item, index) in simpleSellAuctionDetails" :key="index">
        <img
          :src="item.imgUrl"
          class="carousel__item item_size"
          @click="simpleSellClicked(item)"
        />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </template>
</template>

<script lang="ts" setup>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import type { IGeneralAuctionDetails } from "@/interfaces/auction";
import { onMounted, ref } from "vue";
import auctionService from "@/services/auctionService";
import Loader from "../components/loader.vue";
import router from "@/router";

const currentSlide = ref<number>(0);

const slideTo = (val: any) => {
  currentSlide.value = val;
};

const liveAuctionClicked = (args: any) => {
  let queryURL = {
    itemId: args.itemId,
    auctionId: args.auctionId,
    auctionType: args.auctionType,
  };
  router.push({ path: "/make-bid", query: queryURL });
};

const blindAuctionClicked = (args: any) => {
  let queryURL = {
    itemId: args.itemId,
    auctionId: args.auctionId,
    auctionType: args.auctionType,
  };
  router.push({ path: "/make-blind-auction", query: queryURL });
};

const simpleSellClicked = (args: any) => {
  let queryURL = {
    itemId: args.itemId,
    auctionId: args.auctionId,
    auctionType: args.auctionType,
  };
  router.push({ path: "/make-sell", query: queryURL });
};

const blindAuctionDetails = ref<IGeneralAuctionDetails[]>([]);
const simpleSellAuctionDetails = ref<IGeneralAuctionDetails[]>([]);
const isLoading = ref<boolean>(true);
const liveAuctionDetails = ref<IGeneralAuctionDetails[]>([]);
onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await auctionService.getAllBidDetails();
    let allAuctionDetails = response.data.details.map((auction:any) => {
      return {
        auctionId: auction.auctionId,
        auctionType: auction.auctionType,
        ...auction.items[0],
        imgUrl: auction.items[0].imageDetails[0].imgUrl,
      };
    });

    blindAuctionDetails.value = allAuctionDetails.filter(
      (auction:any) => auction.auctionType == "blind"
    );
    simpleSellAuctionDetails.value = allAuctionDetails.filter(
      (auction:any) => auction.auctionType == null// update it to simple get it fixed with BE
    );
    liveAuctionDetails.value = allAuctionDetails.filter(
      (auction:any) => auction.auctionType == "live"
    );
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
