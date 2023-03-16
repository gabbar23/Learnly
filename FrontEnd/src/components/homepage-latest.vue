<template>
  <loader v-if="isLoading"></loader>
  <template v-else>
    <Carousel
      id="gallery"
      :items-to-show="1"
      :wrap-around="false"
      v-model="currentSlide"
    >
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item"    @click="liveAuctionClicked(slide)">{{ slide }}</div>
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
        <div class="carousel__item" @click="slideTo(slide - 1)" >
          {{ slide }}
        </div>
      </Slide>
    </Carousel>
    <h3>Blind Bid</h3>

    <Carousel>
      <template
        v-if="
          blindAuctionDetails && blindAuctionDetails.imageDetails.length > 0
        "
      >
        <Slide
          v-for="(item, index) in blindAuctionDetails.imageDetails"
          :key="index"
        >
          <img
            :src="item.imgUrl"
            class="carousel__item item_size"
            @click="blindAuctionClicked(item)"
          />
        </Slide>
      </template>
      <template v-else>
        <Slide v-for="slide in 5" :key="slide">
          <div class="carousel__item" @click="blindAuctionClicked(slide)">
            {{ slide }}
          </div>
        </Slide>
      </template>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <h3>Simple sell</h3>

    <!-- <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    ...
  </Carousel> -->
    <Carousel>
      <template
        v-if="
          simpleSellAuctionDetails &&
          simpleSellAuctionDetails.imageDetails.length > 0
        "
      >
        <Slide
          v-for="(item, index) in simpleSellAuctionDetails.imageDetails"
          :key="index"
        >
          <img
            :src="item.imgUrl"
            class="carousel__item item_size"
            @click="simpleSellClicked(item)"
          />
        </Slide>
      </template>
      <template v-else>
        <Slide v-for="slide in 5" :key="slide">
          <div class="carousel__item" @click="simpleSellClicked(slide)">
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
import Loader from "../components/loader.vue";
import router from "@/router";


const currentSlide = ref<Number>(0);

const slideTo = (val: any) => {
  currentSlide.value = val;
};

const blindAuctionClicked = (args: any) => {
  console.log("Hello");
  console.log(args);
  let queryURL = {
      itemId: "1",
      auctionId: "1",
      userId: "3",
      auctionType: "blind",
    };
    router.push({ path: "/make-blind-auction", query: queryURL });
};


const simpleSellClicked = (args: any) => {
  console.log("Hello");
  console.log(args);
  let queryURL = {
      itemId: "1",
      auctionId: "1",
      userId: "3",
      auctionType: "blind",
    };
    router.push({ path: "/make-sell", query: queryURL });
};


const liveAuctionClicked = (args: any) => {
  console.log("Hello");
  console.log(args);
  let queryURL = {
      itemId: "1",
      auctionId: "1",
      userId: "3",
      auctionType: "blind",
    };
    router.push({ path: "/make-bid", query: queryURL });
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

const blindAuctionDetails = ref<IGeneralAuctionDetails>({
  auctionId: 6,
  auctionType: "blind",
  imageDetails: [
    {
      imgDescription: "image",
      imgId: 3,
      imgName: "ABC",
      imgUrl:
        "https://imgs.search.brave.com/adfL4JhbA0MuED2eafOFSYiGISmx6NSwYo0MaTAKqSQ/rs:fit:1200:916:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vei93b3Jk/LWJsaW5kLWF1Y3Rp/b24tY29tcG9zZWQt/d29vZGVuLWRpY2Vz/LWdhdmVsLXRhYmxl/LWJhY2tncm91bmQt/Y2xvc2V1cC0xNTM4/NzYyNjYuanBn",
    },
    {
      imgDescription: "image",
      imgId: 4,
      imgName: "ABCDE",
      imgUrl:
        "https://imgs.search.brave.com/wSKxu342YkVQXp6Zvu-IvXCF4QorLvaTXB5ZXfCOYfY/rs:fit:980:342:1/g:ce/aHR0cHM6Ly9taWxp/ZmVzcGFuLm9yZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8x/MC8yMDIwLUJsaW5k/LUF1Y3Rpb24tU1RE/LTEwMTYyMC5qcGc",
    },
  ],
  itemId: 6,
  itemName: "tree",
});
const simpleSellAuctionDetails = ref<IGeneralAuctionDetails>({
  auctionId: 5,
  auctionType: "live",
  itemId: 5,
  itemName: "Flower",
  imageDetails: [
    {
      imgDescription: "image",
      imgId: 1,
      imgName: "WER",
      imgUrl:
        "https://imgs.search.brave.com/dFgEyDwggmFd5VkqXJwjQWeLtNK7tyQfX3CnZy8s2Tw/rs:fit:1200:1000:1/g:ce/aHR0cHM6Ly9nZWF1/Y3Rpb24uY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzA3/LzUtQXVjdGlvbi1U/aXBzLWZvci1CZWdp/bm5lcnMyLmpwZw",
    },
    {
      imgId: 2,
      imgName: "YUT",
      imgUrl:
        "https://imgs.search.brave.com/YtDzxgSycFJwydh6HmTzyQPoQHkO7x07Mt1nqvjU1a8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93ZWFy/ZXJvYXN0LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8w/OC9zaHV0dGVyc3Rv/Y2tfNjkxNjk4MDE5/LmpwZw",
      imgDescription: "test",
    },
    {
      imgDescription: "image",
      imgId: 10,
      imgName: "Screenshot 2023-03-11 at 12.02.34 AM.png",
      imgUrl:
        "https://bidforgood.s3.ca-central-1.amazonaws.com/Screenshot%202023-03-11%20at%2012.02.34%20AM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4C5UR2PMKV2ZI2EO%2F20230316%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230316T025203Z&X-Amz-Expires=604800&X-Amz-Signature=8a841d72eb3106837585d26c2ffb6d2bfbe8cc5a3df030bcdbb67c453c856412&X-Amz-SignedHeaders=host&x-id=GetObject",
    },
  ],
});
const liveAuctionDetails = ref<IGeneralAuctionDetails>({
  auctionId: 5,
  auctionType: "live",
  imageDetails: [
    {
      imgDescription: "image",
      imgId: 1,
      imgName: "WER",
      imgUrl:
        "https://imgs.search.brave.com/dFgEyDwggmFd5VkqXJwjQWeLtNK7tyQfX3CnZy8s2Tw/rs:fit:1200:1000:1/g:ce/aHR0cHM6Ly9nZWF1/Y3Rpb24uY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzA3/LzUtQXVjdGlvbi1U/aXBzLWZvci1CZWdp/bm5lcnMyLmpwZw",
    },
    {
      imgDescription: "image",
      imgId: 2,
      imgName: "WER",
      imgUrl:
        "https://imgs.search.brave.com/YtDzxgSycFJwydh6HmTzyQPoQHkO7x07Mt1nqvjU1a8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93ZWFy/ZXJvYXN0LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8w/OC9zaHV0dGVyc3Rv/Y2tfNjkxNjk4MDE5/LmpwZw",
    },
    {
      imgDescription: "image",
      imgId: 3,
      imgName: "WER",
      imgUrl:
        "https://bidforgood.s3.ca-central-1.amazonaws.com/Screenshot%202023-03-11%20at%2012.02.34%20AM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4C5UR2PMKV2ZI2EO%2F20230316%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230316T025203Z&X-Amz-Expires=604800&X-Amz-Signature=8a841d72eb3106837585d26c2ffb6d2bfbe8cc5a3df030bcdbb67c453c856412&X-Amz-SignedHeaders=host&x-id=GetObject",
    },
  ],
  itemId: 5,
  itemName: "Flower",
});
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

    // blindAuctionDetails.value = allAuctionDetails.filter(
    //   (auction) => auction.auctionType == "blind"
    // );
    // simpleSellAuctionDetails.value = allAuctionDetails.filter(
    //   (auction) => auction.auctionType == null
    // );
    // liveAuctionDetails.value = allAuctionDetails.filter(
    //   (auction) => auction.auctionType == "live"
    // );
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
