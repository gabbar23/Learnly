
<template>
  <loader v-if="isLoading"></loader>
  <template v-else>
    <div
      class="filter-container"
      style="display: flex; justify-content: flex-end"
    >
      <button class="filter-toggle" v-if="!isHidden" @click="showFilter">
        <font-awesome-icon icon="filter" />
      </button>
      <div class="card filter-section" v-if="isHidden">
        <div class="form-group w-40" style="display: inline-block">
          <FormKit
            type="date"
            name="StartDate"
            label="Start Date"
            validation="required"
            validation-visibility="live"
            v-model="startDate"
          />
        </div>
        <div class="form-group w-40" style="display: inline-block">
          <FormKit
            type="date"
            label="End Date"
            :validation="[['date_after', startDate]]"
            v-model="endDate"
          />
        </div>
        <div style="text-align: center">
          <button class="btn btn-primary m-1" @click="filterByDate">
            Search
          </button>
          <button class="btn btn-danger m-1" @click="close">Cancel</button>
        </div>
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
          style="object-fit: contain"
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

    <h3 style="display: flex; justify-content: center">Blind Bid</h3>
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

    <h3 style="display: flex; justify-content: center">Simple sell</h3>

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
import { getDate } from "@/utility";

const startDate = ref<Date>(new Date());
const endDate = ref<Date>(new Date());
const currentSlide = ref<number>(0);
const slideTo = (val: any) => {
  currentSlide.value = val;
};

const close =  () => {
  isHidden.value = false;
};

const showFilter = () => {
  isHidden.value = true;
};

const filterByDate = async (auctions: IGeneralAuctionDetails[]) => {
  let response = await auctionService.getAllBidDetails();

  let allAuctionDetails = response.data.details.map((auction: any) => {
    return {
      auctionId: auction.auctionId,
      auctionType: auction.auctionType,
      startTime: auction.startTime,
      endTime: auction.endTime,
      ...auction.items[0],
      imgUrl: auction.items[0].imageDetails[0].imgUrl,
    };
  });
  blindAuctionDetails.value = allAuctionDetails.filter(
    (auction: any) =>
    auction.auctionType == "blind" &&
      getDate(auction.startTime) >= getDate(startDate.value) &&
      getDate(auction.endTime) <= getDate(endDate.value)
  );
  simpleSellAuctionDetails.value = allAuctionDetails.filter(
    (auction: any) =>
      auction.auctionType == null || auction.auctionType == "simple" && // update it to simple get it fixed with BE
      getDate(auction.startTime) >= getDate(startDate.value) &&
      getDate(auction.endTime) <= getDate(endDate.value)
  );
  liveAuctionDetails.value = allAuctionDetails.filter(
    (auction: any) =>
      auction.auctionType == "live" &&
      getDate(auction.startTime) >= getDate(startDate.value) &&
      getDate(auction.endTime) <= getDate(endDate.value)
  );
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
    // console.log(liveAuctionDetails);
    isLoading.value = true;
    const response = await auctionService.getAllBidDetails();
    console.log(response.data.details);
    let allAuctionDetails = response.data.details.map((auction: any) => {
      return {
        auctionId: auction.auctionId,
        auctionType: auction.auctionType,
        ...auction.items[0],
        imgUrl: auction.items[0].imageDetails[0].imgUrl,
      };
    });

    blindAuctionDetails.value = allAuctionDetails.filter(
      (auction: any) => auction.auctionType == "blind"
    );
    simpleSellAuctionDetails.value = allAuctionDetails.filter(
      (auction: any) => auction.auctionType == null ||
      auction.auctionType == "simple"
      // update it to simple get it fixed with BE
    );
    liveAuctionDetails.value = allAuctionDetails.filter(
      (auction: any) => auction.auctionType == "live"
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
.img_resolution {
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
  grid-template-columns: 1fr 1fr;
}

.filter-icon-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.filter-toggle {
  background-color: #f5f5f5;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}
.card.filter-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #f5f5f5;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}
.form-group label {
  margin-bottom: 0.5rem;
}
.filter-btn {
  background-color: #2b2d42;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
}

.filter-container {
  display: flex;
  align-items: center;
}

.filter-toggle {
  margin-right: 1rem;
}
</style>

