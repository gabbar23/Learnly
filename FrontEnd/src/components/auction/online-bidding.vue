<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-section w-50 mx-auto m-2">
    <div class = "w-100 m-1">
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
      <div class = "row">
        <div class="details">
          <div>Description</div>
          <div>Closing At: {{value}}</div>
          <div>Current Max: 40$</div>
          <div class = "d-flex">
            <div class = "mr-4">Make Bid</div>
            <FormKit  type="text" />
            <button class="btn btn-danger ml-5" @click="sendMessage">Submit Bid</button>
            <p class="time">{{currentTime}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">


import { defineComponent } from "vue";
import "vue3-carousel/dist/carousel.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";


import io from 'socket.io-client';
import type {Socket} from 'socket.io-client'
import { number } from "@formkit/inputs";
// import auctionService from "@/services/auctionService";
import {formatDistance} from 'date-fns';

export default {
  data() {
    return {
      value: 0 ,
      socket: null as Socket | null,
      messages:[""],
      newMessage: '',
      currentTime: new Date().toLocaleString()
    };
  },
  created() {

    setInterval(()=>{
      this.currentTime= new Date().toLocaleString()
    },500);

    console.log("socket message init procrss.....");

   // Connection to socket at server
    this.socket = io('http://localhost:3000/');

    // Listen for 'chat message' events from the server
    this.socket.on('connection', (message) => {
      console.log("got message");
      this.messages.push(message);
    });

  },

  methods: {
    sendMessage() {
      console.log("message sent");
      // Emit a 'chat message' event to the server
      this.socket.emit('placebid', this.newMessage);
      this.newMessage = '';
    }
  }
};

</script>

<style>
.in {
  display: inline-block;
}

.details > div{
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
