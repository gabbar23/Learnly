<template>
  <body>
    <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide" v-if="LiveAuctionList.length>0"
      class="container"
    >
      <Slide v-if="LiveAuctionList.length!=0" v-for="slide in LiveAuctionList.length" :key="slide" >
        <div class="carStyle" style="background-color: black;" @click="SendId(false);AuctionClassifier();" >
          <img :src="LiveAuctionList[currentSlide].imgUrl" v-if="slide>0 " />
        <h1 class="centered">{{LiveAuctionList[currentSlide].auctionId}}</h1> <h1> {{LiveAuctionList[currentSlide].startTime  }}</h1></div>
        <br/>
       <!-- <h2>{{ bidDetails.length }} , {{ bidDetails }} , {{ slide }}</h2> -->
      </Slide>
    </Carousel>
    <div v-else><h1 style="text-align: center; color: red;"> Sorry, there are no live auctions available right now. </h1>
    </div>
  
    <Carousel 
      style="background-color: black; color: #000;"
      id="thumbnails"
      :items-to-show="3" 
      v-model="currentSlide"
      :wrap-around="true"
      :autoplay="5000"
      ref="carousel"
      class="container"
    >
      <Slide  v-for="slide in LiveAuctionList.length" :key="slide" style="background-color: black;">
        <div class="carousel__item" @click="slideTo(slide-1); SendId(false);"> 
          
          <img :src="LiveAuctionList[slide-1].imgUrl" v-if="slide>0"/>

</div>
      </Slide>
    </Carousel>

    <br/>
    <h1 style="text-align: center;"> Blind Auctions</h1>
    <Carousel 
    :items-to-show="2" 
    item v-if="BlindAuctionList.length>0"
    class="container"
    style="background-color: black;"
    >
    <Slide v-for="slide in BlindAuctionList.length" :key="slide">
        <div class="carousel__item" @click=" SendId(true); AuctionClassifier();" >
        <img :src="BlindAuctionList[slide-1].imgUrl" v-if="slide>0"/></div>
          <h1 class="centered" style="color: red;">{{ BlindAuctionList[slide-1].auctionId }}</h1>
      </Slide>
  </Carousel>
  <div v-else><h1 style="text-align: center; color: red;"> Sorry, there are no blind auctions available right now. </h1></div>

  <br/>
      <br/>
      <h1 style="text-align: center;"> Items on Sale</h1>


  <Carousel :items-to-show="3"  :wrap-around="true" class="container">
    <Slide v-for="slide in ItemsOnSaleList.length" :key="slide" >
        <div class="carousel__item" @click="BuyItem">
        <img :src="bidDetails[slide-1].imgUrl" v-if="slide>0"/>
        <h1 class="centered">Item on Sale {{ slide }}</h1>
        </div>
      </Slide>
  </Carousel>


    </body>
  </template>
  
  <script lang="ts"> 
  import { Carousel, Navigation, Slide } from 'vue3-carousel'
  import { computed, onMounted, reactive, ref } from 'vue';
  import AuthService from '@/services/AuthService';
  import auctionService from '@/services/auctionService';
  import router from '@/router';
import type { IPostBidDetails, IGetAuctionItemDetails } from '@/interfaces/auction';
import { color, range } from '@formkit/inputs';
  
  let auctionDetails =reactive<IPostBidDetails>({
  itemName: "",
  startTime: new Date(),
  endTime: new Date(),
  startPrice: "",
  provinceName: "",
  cityName: "",
  postalCode: "",
  address: "",
  itemDes: "",
  imageDetails: [],
  bidType: "",
  isSold: 0,
  startDate: new Date(),
  endDate: new Date(),
  });
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
    let bidDetailsRes=await AuthService.fetchDetails();
    let ItemIdData=await auctionService.getItemDetails(1);


  export default {
    name: 'Gallery',
    components: {
      Carousel, 
      Slide,
      Navigation,
    },
    created() {
        this.AuctionList()
        this.SaleItems()

    },
    data: () => ({
      currentSlide: 0,
   //   imgLinks:["\"../assets/img/home/slider1.jpg\"","\"../assets/img/home/slider2.jpg\"","\"../assets/img/home/slider3.jpg\""],
//     blindBidImageList:["\"../assets/img/home/slider4.jpg\""],
      ItemsOnSaleList:[],
//      link1:"../assets/img/home/slider1.jpg",
      bidDetails:bidDetailsRes.data,
      LiveAuctionList: [],
      BlindAuctionList: [],
      flag:false,
      AucIdData: "",
      ItemIdData: ItemIdData.data,
    }),
    methods: {
      async SaleItems(){

        let ItemDetails=await auctionService.getItemDetails
        for(let i=0;i<6;i++){
        this.ItemsOnSaleList.push(ItemDetails(i).data);
} 
        //console.log(await ItemDetails.data)
 
        console.log(await auctionService.getAuctionDetails(2))
      }
      ,
      AuctionList(){
        let auctionData=bidDetailsRes.data
//console.log(bidDetailsRes.data)

for(let i in auctionData){
   // console.log(auctionData[i].auctionType)
    if (auctionData[i].auctionType=="live"){
      this.LiveAuctionList.push(auctionData[i])

    }
    if (auctionData[i].auctionType=="blind"){
      this.BlindAuctionList.push(auctionData[i])
    
}}
    
      },
      slideTo(val: number) {
        this.currentSlide = val
      },
      
      
      async SendId(flag: boolean){
        if(flag==true){
          this.AucIdData= this.BlindAuctionList[this.currentSlide]

        }
        else{
          this.AucIdData= this.LiveAuctionList[this.currentSlide]
        }
          console.log(this.AucIdData)
      },

        async AuctionClassifier() {
    try {
      await AuthService.fetchDetails()
      .then((res:any) => {
          //console.warn(res);
          //console.log(AuthService.getImageDetails())
          let currentBidDetails=this.AucIdData;
         // console.log(res.data)
        //  console.log(currentBidDetails)
        //  console.log(currentBidDetails.auctionType)

          let queryURL= { 
            address: currentBidDetails.address,
            auctionId: currentBidDetails.auctionId,
            auctionType: currentBidDetails.auctionType,
            cityName:currentBidDetails.cityName,
            createdAt: currentBidDetails.createdAt,
            endTime: currentBidDetails.endTime,
            imgName: currentBidDetails.imgName,
            imgUrl: currentBidDetails.imgUrl,
            itemItemId: currentBidDetails.itemItemId,
            itemName: currentBidDetails.itemName,
            postalCode: currentBidDetails.postalCode,
            provinceName: currentBidDetails.provinceName,
            startTime: currentBidDetails.startTime,
            updatedAt: currentBidDetails.updatedAt,
            user_id: currentBidDetails.user_id
            }
            if(currentBidDetails.auctionType=="blind"){
          router.push({path: "/make-blind-auction", query: queryURL})
         }
         else if(currentBidDetails.auctionType=="live")
         {
            router.push({path: "/make-bid", 
            query: queryURL,
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
       // console.log(check)
       try {
      await AuthService.fetchDetails()
      .then((res:any) => {
          //console.warn(res);
          //console.log(AuthService.getImageDetails())
          let currentItem=this.ItemIdData;
         // console.log(res.data)
        //  console.log(currentBidDetails)
        //  console.log(currentBidDetails.auctionType)
          console.log(currentItem.imageDetails)
          let queryURL= { 
            imageDetails: currentItem.imageDetails[0].imgUrl,
            createdAt: currentItem.createdAt,
            isSold: currentItem.isSold,
            itemDes: currentItem.itemDes,
            itemId: currentItem.itemId,
            itemName: currentItem.itemName,
            startPrice: currentItem.startPrice,
            updatedAt: currentItem.updatedAt,
            user_id: currentItem.user_id,
            }
            {
          router.push({path: "/make-sell", query: queryURL})
         }
        })
         .catch((err: any) => {
          console.error(err);
        });
    } catch {
      console.error("Error in auction button exception");
    }
        
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

  .container {
  position: relative;
  text-align: center;
  color: white;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
  
  .try{
    position:fixed; left:0;right:0;top:0;bottom:0;
  }
  </style>
  