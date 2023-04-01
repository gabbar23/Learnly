<template>
  <loader v-if="isLoading"></loader>
  <template v-else>
    <button @click="isHidden=!isHidden"><h5>Filter</h5></button>
    <div v-show="isHidden">
    <h6 style="display: flex; justify-content:center;">Date between</h6>
    <div class="parent_sect">
    <FormKit
  type="date"
  name="StartDate"
  label="Start Date"
  validation="required"
  validation-visibility="live"
  v-model="startDate"
/>
<br />
<FormKit
  type="date"
  label="End Date"
  :validation="[['date_after', startDate]]"
/>
</div>
</div>
    <Carousel
      id="gallery"
      :items-to-show="1"
      :wrap-around="false"
      v-model="currentSlide"
    >
      <Slide v-for="(item, index) in liveAuctionDetails" :key="index">
        <img
          :src="item.imgUrl"
          onerror="this.src='https://imgs.search.brave.com/5W8zVnZVHamv7gy2RklV0IPv4-vJWrNe0wCqNTUjlDo/rs:fit:630:630:1/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdGVlcHVibGlj/L2ltYWdlL3ByaXZh/dGUvcy0tNzlFd0pr/M3otLS90X1ByZXZp/ZXcvYl9yZ2I6MDAw/MDAwLGNfbGltaXQs/Zl9hdXRvLGhfNjMw/LHFfOTAsd182MzAv/djE2MDgyMzY0NDMv/cHJvZHVjdGlvbi9k/ZXNpZ25zLzE3NTE5/ODQ1XzAuanBn'"
          class="carousel__item item_size"
          style="object-fit: contain;"
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
          onerror="this.src='https://imgs.search.brave.com/5W8zVnZVHamv7gy2RklV0IPv4-vJWrNe0wCqNTUjlDo/rs:fit:630:630:1/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdGVlcHVibGlj/L2ltYWdlL3ByaXZh/dGUvcy0tNzlFd0pr/M3otLS90X1ByZXZp/ZXcvYl9yZ2I6MDAw/MDAwLGNfbGltaXQs/Zl9hdXRvLGhfNjMw/LHFfOTAsd182MzAv/djE2MDgyMzY0NDMv/cHJvZHVjdGlvbi9k/ZXNpZ25zLzE3NTE5/ODQ1XzAuanBn'"
          class="carousel__item item_size img_resolution"
          @click="slideTo(index - 1)"
        />
      </Slide>
    </Carousel>

    <h3 style="display: flex; justify-content:center;">Blind Bid</h3>
    <Carousel>
      <Slide v-for="(item, index) in blindAuctionDetails" :key="index">
        <img
          :src="item.imgUrl"
          onerror="this.src='https://imgs.search.brave.com/5W8zVnZVHamv7gy2RklV0IPv4-vJWrNe0wCqNTUjlDo/rs:fit:630:630:1/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdGVlcHVibGlj/L2ltYWdlL3ByaXZh/dGUvcy0tNzlFd0pr/M3otLS90X1ByZXZp/ZXcvYl9yZ2I6MDAw/MDAwLGNfbGltaXQs/Zl9hdXRvLGhfNjMw/LHFfOTAsd182MzAv/djE2MDgyMzY0NDMv/cHJvZHVjdGlvbi9k/ZXNpZ25zLzE3NTE5/ODQ1XzAuanBn'"
          class="carousel__item item_size"
          @click="blindAuctionClicked(item)"
        />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <h3 style="display: flex; justify-content:center;">Simple sell</h3>

    <Carousel>
      <Slide v-for="(item, index) in simpleSellAuctionDetails" :key="index">
        <img
          :src="item.imgUrl"
          onerror="this.src='https://imgs.search.brave.com/5W8zVnZVHamv7gy2RklV0IPv4-vJWrNe0wCqNTUjlDo/rs:fit:630:630:1/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdGVlcHVibGlj/L2ltYWdlL3ByaXZh/dGUvcy0tNzlFd0pr/M3otLS90X1ByZXZp/ZXcvYl9yZ2I6MDAw/MDAwLGNfbGltaXQs/Zl9hdXRvLGhfNjMw/LHFfOTAsd182MzAv/djE2MDgyMzY0NDMv/cHJvZHVjdGlvbi9k/ZXNpZ25zLzE3NTE5/ODQ1XzAuanBn'"
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
import { date } from "@formkit/i18n";

const startDate = ref<Date>(new Date());
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
let isHidden = ref<boolean>(false);

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
  overflow: hidden;
  object-fit: contain;
  min-height: 200px;
  max-height: 600px;
  width: 80%;
  background-color: black;
  color: white;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img_resolution{
  width: 500px;
  height: 200px;
}

.carousel__slide {
  height: fit-content;
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.parent_sect {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
</style>
