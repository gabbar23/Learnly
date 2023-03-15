<template>
  <body>
  
    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide" v-if="bidDetails.length>0"
    >
      <Slide v-if="bidDetails.length!=0" v-for="slide in bidDetails.length" :key="slide">
        <div class="carStyle" style="background-color: black;" @click="AuctionClassifier">
          <img :src="link1" v-if="slide>0"/></div>
        <h1 v-if="slide>0">{{imgLinks[slide-1]}}</h1>
      </Slide>
    </Carousel>
    <div v-else><h1 style="text-align: center; color: red;"> Sorry, there are no live auctions available right now. </h1></div>
  
    <Carousel 
      id="thumbnails"
      :items-to-show="4"
      :wrap-around="true"
      v-model="currentSlide"
      ref="carousel"
    >
      <Slide v-for="slide in bidDetails.length" :key="slide">
        <div class="carousel__item" @click="slideTo(slide - 1)"> Bid ID: {{ bidDetails[slide -1].bidId }} 
          <br/>Bid Type: {{ bidDetails[slide -1].bidType }}</div>
      </Slide>
    </Carousel>
    
  <Carousel :items-to-show="2" item v-if="blindBidImageList.length>0">
    <Slide v-for="slide in blindBidImageList.length" :key="slide" @click="Logger">
        <div class="carousel__item" @click="slideTo(slide - 1)">Blind Bid image {{ slide }}</div>
      </Slide>
  </Carousel>
  <div v-else><h1 style="text-align: center; color: red;"> Sorry, there are no blind auctions available right now. </h1></div>
  <Carousel :items-to-show="3" v-if="bidItems.length>0">
    <Slide v-for="slide in ItemsOnSaleList.length" :key="slide">
        <div class="carousel__item" @click="BuyItem">Item on Sale image {{ slide }}</div>
      </Slide>
  </Carousel>
  <div v-else><h1 style="text-align: center; color: red;"> All items are sold out! </h1></div>
    </body>
  </template>
  
  <script lang="ts"> 
  import { Carousel, Navigation, Slide } from 'vue3-carousel'
  import type {IGetAuctionDetails, IGetAuctionItemsDetails} from "@/interfaces/auction-details"
  import { computed, reactive, ref } from 'vue';
  import AuthService from '@/services/AuthService';
  import router from '@/router';
  import { el } from '@formkit/i18n';
  
  let auctionDetails =reactive<IGetAuctionDetails>({
  address: '',
  bidId: 0,
  bidType: '',
  cityName: '',
  createdAt: '',
  endTime: '',
  isSold: false,
  postalCode: '',
  provinceName: '',
  startTime: '',
  updatedAt: '',
  user_id: null
  });
  let auctionItemDetails = reactive<IGetAuctionItemsDetails>({
    itemID:0,
    itemName: '',
    itemDes: '',
    startPrice: 0,
    createdAt: '',
    updatedAt: '',
    user_id: null,
  });
    let bidDetailsRes=await AuthService.getBidDetails();
    let bidItemsRes=await AuthService.getBidItems();
    
    
  export default {
    name: 'Gallery',
    components: {
      Carousel, 
      Slide,
      Navigation,
    },
    data: (async) => ({
      currentSlide: 0,
      imgLinks:["\"../assets/img/home/slider1.jpg\"","\"../assets/img/home/slider2.jpg\"","\"../assets/img/home/slider3.jpg\""],
      blindBidImageList:["\"../assets/img/home/slider4.jpg\""],
      ItemsOnSaleList:["\"../assets/img/home/slider4.jpg\""],
      link1:"../assets/img/home/slider1.jpg",
      bidItems: bidItemsRes.data,
      bidDetails:bidDetailsRes.data,
    }),
    methods: {
    
      slideTo(val: number) {
        this.currentSlide = val
      },
      Logger(){
        console.log(bidDetailsRes)
        console.log(bidItemsRes)
        console.log("button clicked!")
      },
      async getAuctionNum(){
       console.log("image clicked",this.currentSlide+1)
  
      },
  
        async AuctionClassifier(data:any) {
    try {
      await AuthService.getBidDetails()
      .then((res:any) => {
          //console.warn(res);
          //console.log(AuthService.getImageDetails())
          
          let currentBidDetails=res.data[this.currentSlide];
          
          //console.log(currentBidDetails.bidType)
         if(currentBidDetails.bidType=="blind"){
          router.push({path: "/make-blind-auction",
          query: { 
              bidId: currentBidDetails.bidId,
              startTime: currentBidDetails.startTime,
              endTime: currentBidDetails.endTime,
            }
          })
         }
         else if(currentBidDetails.bidType=="live")
         {
            router.push({path: "/make-bid", 
            query: { 
              bidId: currentBidDetails.bidId,
              startTime: currentBidDetails.startTime,
              endTime: currentBidDetails.endTime,
            },
          });
          
         }
        })
        .catch((err: any) => {
          console.error(err);
        });
    } catch {
      console.error("Error in auction button exception");
    }
      },
      async BuyItem(){
        console.log("item bought")
        router.push("/make-sell");
  
      }
    },
    setup() {
      const sell = () => {
        console.log("Sell");
      };
  
      const auction = () => {
        console.log("Auction");
      };
  
      return {
        sell,
        auction,
      };
    },
  };
  </script>
  <style>
  body {
    background-color: #eadfdf;
  }
  .white-smoke{
    color: whitesmoke;
  }
    .v-card--reveal {
      align-items: center;
      bottom: 0;
      justify-content: center;
      opacity: .5;
      position: absolute;
      width: 100%;
    }
  img {
    height: 300px;
    width: 400px;
  }
  
  
  .main-card {
    border: 1px solid;
    max-width: 30vw;
    margin: 0.5em;
  }
  
  .main-card > .img {
    height: 30vh;
  }
  .main-home-section {
    height: 30vh;
    display: flex;
    flex-wrap: wrap;
  }
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .bottom-btn > button {
    margin: 2em;
    padding: 1em;
  }
  
  .try{
    position:fixed; left:0;right:0;top:0;bottom:0;
  }
  </style>
  