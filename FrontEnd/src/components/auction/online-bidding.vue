<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-section w-50 mx-auto m-2 my-hover">
    <loader v-if="isLoading"></loader>
    <div v-else>
      <div class="w-100 m-1">
        <Carousel :autoplay="2000" :wrap-around="true">
          <Slide v-for="slide in 4" :key="slide">
            <div class="carousel__item">{{ slide }}</div>
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
      <div class>
        <div class="row">
          <div class="details">
            <div>Description:{{ description }}</div>
            <div>Starting At: {{ startTime }}</div>
            <div>Closing At: {{ endTime }}</div>
            <div>Start Price: {{ startVal }}$</div>
            <div>Highest Bid Price: {{ highestBid }}$</div>
            <div>Your Bid: {{ myBid }}$</div>
            <div class="d-flex">
              <div class="mr-4">Make Bid</div>
              <FormKit
                type="form"
                submit-label="Make Bid"
                :actions="false"
                @submit="makeBid"
              >
              <p style="color: red;">{{bidStatus}}</p>
                <FormKit type="text" v-model="bidAmount" />
                <button
                  class="btn btn-danger ml-5"
                  @click="sendMessage()"
                  :disabled="isBidMade"
                >
                  Submit Bid{{ minVal }}
                </button>
                

                <!-- <div v-if="isBidMade">{{ timeLeft }} sec</div> -->
              </FormKit>
            </div>
          </div>
          <!-- <div>
            <h1>Auction Ending in:</h1>
            <div>{{ countdown }}</div>
          </div> -->
          <div>
            <div v-if="+timer < 0">{{ formatTime(timer) }}</div>
            <div v-else>Time's up!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";



import io from 'socket.io-client';
import type {Socket} from 'socket.io-client'
import { message, number } from "@formkit/inputs";
import auctionService from "./../../services/auctionService";
import { formatDistance } from "date-fns";

import Loader from "../loader.vue";
import authentication from "../../../../server/dev/util/authentication";

const isBidMade = ref<boolean>(false);
const timeLeft = ref(10); // 60 seconds
const minVal = ref<Number>(5);
const minValidation = ref<any>({ min: 5 });
const isLoading = ref<boolean>(false);
const bidAmount = ref<Number>();
const bidStatus = ref<String>();
const countdown = ref<Date>();


const userDetails  = localStorage.getItem("userDetails");

let user = JSON.parse(userDetails!);
const userId = ref<Number>(user.userId);

const makeBid = () => {
  isBidMade.value = true;
  timer = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value === 0) {
      clearInterval(timer);
    }
  }, 1000);
};

watch(timeLeft, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
  if (newValue == 0) {
    isBidMade.value = false;
    clearInterval(timer);
    timeLeft.value = 10;
  }
});

let highestBid = ref<Number>(0);
let startVal = ref<Number>(100);
// let myVal = ref<Number>(0);

let startTime = ref<Date>();
let endTime = ref<Date>();
let socket = ref<Socket>();
const description = ref<String>();
let myBid = ref<Number>();

let timer = ref<String>();

onMounted(() => {

  
  // let userId = user.userId
  
  let id = 1;

  // auctionService
  //   .getAuctionDetails(id)
  //   .then((res) => {
  // auctionService.getAuctionEndTime(id).then((res)=>{
  //   timer = res.data;
  // }).catch((res)=>{
  //   console.log("time not fetched");
  // });

  // const images = auctionService.getImages(id).then((res)=> {
  //   console.log(res);
  //   return res;
  // }).catch(()=>{
  //   console.log("cant load auction details");
  // })

  auctionService.getAuctionDetails(id).then((res) => {
      console.log(res.data);
      startTime.value = res.data.startTime;
      endTime.value = res.data.endTime;
    })
    .catch(() => {
      console.log("cant load auction details");
    });

   
    auctionService.getItemDetails(id).then((res)=> {
      description.value = res.data.itemDes;    
      startVal.value = res.data.startPrice;
      console.log(res);
    })
    .catch(() => {
      console.log("cant fetch item details");
    });

    auctionService.getCurrentMax(id).then((res) => {
      highestBid.value = res.data;
    }).catch((res) => {
      console.log("Current Max Failed = " + res);
    });

    auctionService.getCurrentUserBid(userId.value,id).then((res) => {
      myBid.value = res.data;
    });

});

// setInterval(() => {
//   const now:Date = new Date();
//   let remainingTime:number = endTime.value - now
//   const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      
//       timer.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;

// }, 1000);

// Connection to socket at server
socket.value = io("http://localhost:3000/");

// Listen for 'chat message' events from the server

socket.value.on("connection", (message: string) => {
  console.log(message);
});

socket.value.on("bidUpdate", (info) => {
  bidStatus.value = undefined;
  highestBid.value = info.highestBid;
});

socket.value.on('login',(data)=>{
  bidStatus.value = data;
});


socket.value.on('bidStatus',(data)=>{
  bidStatus.value = data;
  console.log(data);
});


socket.value.on('yourBidUpdate',(data)=>{
  myBid.value = data.highestBid
})

socket.value.on('out',(data)=>{
  bidStatus.value = data
});

socket.value.on("disconnect", () => {
  console.log("user disconnected");
});
  
const sendMessage = () => {
  console.log("message sent");
  // Emit a 'chat message' event to the server
  const seesionId = localStorage.getItem("sessionId");
  const itemId = 1

  const bidVal = 100;
  socket.value!.emit("placeBid", {
    seesionId: seesionId,
    itemId:itemId,
    userId:userId.value,
    bidVal: bidAmount.value,
  });
};

const formatTime = (time: any) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
</script>

<style>
.in {
  display: inline-block;
}

.details > div {
  padding: 2em;
}

.main-section {
  border: 1px solid;
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

/* .my-hover{
  background-color: white;
  border:1px lightblue
}

.my-hover:hover{
  transition: 1s;
  box-shadow: 0px 0px 20px 20px gray;
} */
</style>
