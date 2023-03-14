<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-section w-50 mx-auto m-2">
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
      <div>
        <div class="row">
          <div class="details">
            <div>Description</div>
            <div>Starting At: {{startTime}}</div>
          <div>Closing At: {{endTime}}</div>
          <div>Start Price: {{startVal}}$</div>
            <div>Current Max: {{higestBid}}$</div>
            <div class="d-flex">
              <div class="mr-4">Make Bid</div>
              <FormKit
                type="form"
                submit-label="Make Bid"
                :actions="false"
                @submit="makeBid"
              >
                <FormKit type="text" v-model="bidAmount" />
                <button class="btn btn-danger ml-5" @click="sendMessage()" :disabled="isBidMade">
                  Submit Bid{{ minVal }}
                </button>
                <div v-if="isBidMade">{{ timeLeft }} sec</div>
              </FormKit>
            </div>
          </div>
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
import { computed, defineComponent, onMounted ,reactive, ref, watch } from "vue";



import io from 'socket.io-client';
import type {Socket} from 'socket.io-client'
import { number } from "@formkit/inputs";
import auctionService from "./../../services/auctionService";
import {formatDistance} from 'date-fns';

import Loader from "../loader.vue";

const isBidMade = ref<boolean>(false);
const timeLeft = ref(10); // 60 seconds
let timer: any;
const minVal = ref<Number>(5);
const minValidation = ref<any>({ min: 5 });
const isLoading = ref<boolean>(false);
const bidAmount = ref<Number>();

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
  
let higestBid = ref<Number>(0);
let startVal = ref<Number>(100);
let myVal = ref<Number>(0);

let startTime = ref<dateFns>();
let endTime = ref<dateFns>();
let socket = ref<Socket>();
   

onMounted(()=>{

    let id:number = 1

    auctionService.getAuctionEndTime(id).then((res)=>{
      timer = res.data;
    }).catch((res)=>{
      console.log("time not fetched");
    });

    auctionService.getAuctionDetails(id).then((res)=> {
      
      console.log(res.data.message.startTime);
      startTime.value = res.data.message.startTime;
      endTime.value = res.data.message.endTime;
      startVal.value = res.data.message.startVal;

    }).catch(()=>{
      
    })

});


setInterval(()=>{
  timer= new Date().toLocaleString()
  },500);

// Connection to socket at server
socket.value = io("http://localhost:3000/");
    
// Listen for 'chat message' events from the server

socket.value.on('connection', (message:string) => {

  console.log("connected");  

});
     
socket.value.on('disconnect', () => {
  console.log('user disconnected');
});
    

socket.value.on('bidUpdate',(data,sessionId)=>{
  
  higestBid.value = data  
  console.log(higestBid.value);

});

  
const sendMessage = () => {
  
  console.log("message sent");
  // Emit a 'chat message' event to the server
  const seesionId = localStorage.getItem("sessionId");
  const bidVal = 100;
  socket.value!.emit('placeBid',{seesionId:seesionId,bidVal:bidAmount.value});
}

const formatTime = (time:any) =>  {

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

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
</style>
