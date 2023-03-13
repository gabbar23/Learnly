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
            <div>Current Max: {{hiestBid}}$</div>
            <div class="d-flex">
              <div class="mr-4">Make Bid</div>
              <FormKit
                type="form"
                submit-label="Make Bid"
                :actions="false"
                @submit="makeBid"
              >
                <FormKit type="text" />
                <button class="btn btn-danger ml-5" @click="sendMessage" :disabled="isBidMade">
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


import { ref, watch } from "vue";
import "vue3-carousel/dist/carousel.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";


import io from 'socket.io-client';
import type {Socket} from 'socket.io-client'
import { number } from "@formkit/inputs";
import auctionService from "./../../services/auctionService";
import {formatDistance} from 'date-fns';


export default {
  
  components:{ Navigation, Carousel, Slide, Pagination },

  data() {
    return {
      hiestBid:0,
      startVal:0,
      myVal:0,
      startTime:"",
      endTime:"",
      timer:new Date().toLocaleString(),
      socket: null as Socket | null,
    };
  },

  created() {

    let id:number = 1

    auctionService.getAuctionEndTime(id).then((res)=>{
      this.timer = res.data;
    }).catch((res)=>{
      console.log("time not fetched");
    });

    auctionService.getAuctionDetails(id).then((res)=> {
      
      console.log(res.data.message.startTime);
      this.startTime = res.data.message.startTime;
      this.endTime = res.data.message.endTime;
      this.startVal = res.data.message.startVal;

    }).catch(()=>{
      
    })


    setInterval(()=>{
      this.timer= new Date().toLocaleString()
    },500);

    console.log("socket message init procrss.....");

   // Connection to socket at server
    this.socket = io("http://localhost:3000/");
    
    // Listen for 'chat message' events from the server

    this.socket.on('connection', (message:string) => {

      console.log("connected");
    });
     
    this.socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    

    this.socket.on('bidUpdate',(data,sessionId)=>{
          this.hiestBid = data
    
          console.log(this.hiestBid);
      })

  },

  methods: {
    sendMessage() {
      console.log("message sent");
      // Emit a 'chat message' event to the server
      const seesionId = localStorage.getItem("sessionId");
      const bidVal = 100;
      this.socket!.emit('placeBid',{seesionId:seesionId,bidVal:bidVal});

    },

    formatTime(time:any) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
  }
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
</style>
