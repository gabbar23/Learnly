<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="containers">
    <div class="main-section w-50 mx-auto m-2 my-hover">
      <loader v-if="isLoading"></loader>
      <div v-else>
        <h3 class="text-center mb-5">Live Bidding</h3>
        <div class="w-100 m-1">
          <Carousel :autoplay="2000" :wrap-around="true">
            <template v-if="sellItemDetail.imageDetails.length > 0">
              <Slide
                v-for="(item, index) in sellItemDetail.imageDetails"
                :key="index"
              >
                <img :src="item.imgUrl" class="carousel__item item_size" />
              </Slide>
            </template>
            <template v-else>
              <Slide v-for="slide in 5" :key="slide">
                <div class="carousel__item">
                  {{ slide }}
                </div>
              </Slide>
            </template>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <div class="details">
          <div class="row p-3">
            <div class="col-4 p-2 font-weight-bold">Description:</div>
            <div class="col-8 p-2">{{ description }}</div>
            <div class="col-4 p-2 font-weight-bold">Starting At:</div>
            <div class="col-8 p-2">{{ startTime }}</div>

            <div class="col-4 p-2 font-weight-bold">Closing At:</div>
            <div class="col-8 p-2">{{ endTime }}</div>

            <div class="col-4 p-2 font-weight-bold">Start Price:</div>
            <div class="col-8 p-2">{{ startVal }}$</div>

            <div class="col-4 p-2 font-weight-bold">Highest Bid Price:</div>
            <div class="col-8 p-2">{{ highestBid }}$</div>

            <div class="col-4 p-2 font-weight-bold">Your Bid:$</div>
            <div class="col-8 p-2">{{ myBid }}$</div>

            <div class="col-4 p-2 font-weight-bold">Make Bid:</div>
            <div class="col-8 p-2">
              <FormKit type="text" v-model="bidAmount" />
            </div>
          </div>

          <div class="text-center">
            <button
              class="btn btn-danger"
              @click="sendMessage()"
              :disabled="isBidMade"
            >
              Submit Bid
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pos" v-if = "globalTimer > 0">
      <Timer :timeLeft="globalTimer" @time="updateGlobalTime"></Timer>
    </div>
    <div class="card scrollable-div">
      <div class="card-header">
        <h5>Recent Bids</h5>
      </div>
      <div class="card-body p-0">
        <div
          class="d-flex align-items-center px-3 py-2 border-bottom"
          v-for="(user, index) in topUserList"
          :key="index"
        >
          <span class="mr-3">
            <font-awesome-icon icon="user-circle" />
          </span>
          <span class="flex-grow-1"
            >{{ user.firstName + " " + user.lastName }}
          </span>
          <span>{{ user.bidAmount > 0 ? user.bidAmount + "$" : "N/A" }}</span>
        </div>
      </div>
    </div>
    <div class="bubble-container">
      <BubbleAnimation
        v-for="(bubble, index) in bubbles"
        :key="index"
        :name="bubble.name"
        :top="bubble.top"
        :left="bubble.left"
        :size="bubble.size"
        :cost="bubble.cost"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { onMounted, reactive, ref, watch } from "vue";

import io from "socket.io-client";
import type { Socket } from "socket.io-client";
import auctionService from "./../../services/auctionService";

import Loader from "../loader.vue";
import BubbleAnimation from "../bubble-animation.vue";
import type { IGetAuctionItemDetails } from "@/interfaces/auction";
import { Timer } from "../component";

import { useRoute } from "vue-router";
import type { IRecentBidder } from "@/interfaces/bid-for-good";

const isBidMade = ref<boolean>(false);
const timeLeft = ref(10); // 60 seconds
const isLoading = ref<boolean>(false);
const bidAmount = ref<Number>();
const bidStatus = ref<String>();

const topUserList = ref<IRecentBidder[]>([]);

let sellItemDetail = reactive<IGetAuctionItemDetails>({
  imageDetails: [],
  createdAt: "",
  isSold: false,
  itemDes: "",
  itemId: 0,
  itemName: "",
  startPrice: 0,
  updatedAt: "",
  user_id: 0,
  bidAmount: null,
});

const userDetails: any = localStorage.getItem("userDetails");
const { userId, sessionId } = JSON.parse(userDetails);

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

let startTime = ref<Date>();
let endTime = ref<Date>();
let socket = ref<Socket>();
const description = ref<String>();
let myBid = ref<Number>();

let timer: number;
const route = useRoute();
const { itemId, auctionId, auctionType } = route.query;
const bubbles = ref<any>([]);
const globalTimer = ref<number>(0);


const startDate = new Date();
startDate.setHours(startDate.getHours() - 1);
const endDate = new Date("Sat Apr 01 2023 16:32:58 GMT-0300 (Atlantic Daylight Time)");
endDate.setHours(endDate.getHours() + 1);

// Add an hour to the date

socket.value = io("http://localhost:3000/");

const calculateTimer = () => {
  const timeRemaining = endDate.getTime() - Date.now();
  if (timeRemaining < 0) {
    console.log("auction ended sorry");
  }
  const timeInSeconds = Math.floor(timeRemaining / 1000);
  globalTimer.value = timeInSeconds;
};

const updateGlobalTime = (time: any) => {
  globalTimer.value = time;
};

onMounted(async () => {
  calculateTimer();
  // const userId = user.userId;
  try {
    isLoading.value = true;
    const requestPayload: any = {
      itemId,
      auctionId,
      auctionType,
      userId,
    };

    let auctionDetails = await auctionService.getAuctionDetails(
      requestPayload.auctionId
    );

    console.log("Top users");
    auctionService
      .getTopFiveUser(requestPayload.auctionId)
      .then((result) => {
        const tempResult = result.data.map((bid: any) => {
          return {
            firstName: bid.UserDetail.firstName,
            lastName: bid.UserDetail.lastName,
            bidAmount: bid.bidAmount,
            userId: bid.UserDetail.userId,
          };
        });
        topUserList.value = tempResult;
        console.log(topUserList.value);
      })
      .catch((result) => {
        console.log("top User List failed.");
        // console.log(result)
      });

    const updateUserList = () => {
      auctionService
        .getTopFiveUser(requestPayload.auctionId)
        .then((result) => {
          const tempResult = result.data.map((bid: any) => {
            return {
              firstName: bid.UserDetail.firstName,
              lastName: bid.UserDetail.lastName,
              bidAmount: bid.bidAmount,
            };
          });
          topUserList.value = tempResult;
          //  console.log(topUserList.value);
        })
        .catch((result) => {
          console.log("top User List failed.");
          // console.log(result)
        });
    };

    updateUserList();

    socket.value?.on("updateTopUserList", (data) => {
      updateUserList();
    });

    auctionService
      .getNewItemDetails(requestPayload)
      .then((res) => {
        description.value = res.data.item.itemDes;
        startVal.value = res.data.item.startPrice;
        sellItemDetail = res.data.item;
      })
      .catch(() => {
        console.log("cant fetch item details");
      });

    auctionService
      .getCurrentMax(requestPayload.auctionId)
      .then((res) => {
        highestBid.value = res.data;
      })
      .catch((res) => {
        console.log("Current Max Failed = " + res);
      });

    auctionService
      .getCurrentUserBid(userId, requestPayload.auctionId)
      .then((res) => {
        myBid.value = res.data;
      });
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});

// Connection to socket at server

socket.value.on("connection", (message: string) => {
  console.log(message);
});

socket.value.on("bidUpdate", (info) => {
  bidStatus.value = undefined;
  highestBid.value = info.highestBid;
  console.warn(info);
  bubbles.value = [];
  bubbles.value = [
    { name: "Alice", top: 300, left: -600, size: 50, cost: +highestBid.value },
  ];
  // const timer = setTimeout(() => {
  //   bubbles.value = [];
  //   clearTimeout(timer);
  // }, 4000);
});

socket.value.on("login", (data) => {
  bidStatus.value = data;
});

socket.value.on("bidStatus", (data) => {
  bidStatus.value = data;
  console.log(data);
});

socket.value.on("yourBidUpdate", (data) => {
  myBid.value = data.highestBid;
});

socket.value.on("out", (data) => {
  bidStatus.value = data;
});

socket.value.on("disconnect", () => {
  console.log("user disconnected");
});

const sendMessage = () => {
  console.log("message sent");
  // Emit a 'chat message' event to the server
  // const seesionId = localStorage.getItem("sessionId");
  // const itemId = 1;

  console.log("Session ID:", sessionId);
  console.log("itemId ID:", itemId);
  console.log("userId ID:", userId);
  console.log("bidAmount ID:", bidAmount.value);

  socket.value!.emit("placeBid", {
    seesionId: sessionId,
    itemId: itemId,
    userId: userId,
    bidVal: bidAmount.value,
  });
};
</script>
<style scoped>
.main-section {
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.carousel__item {
  height: 300px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
}

.font-weight-bold {
  font-weight: bold;
}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #ff4c4c;
  color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

h3 {
  color: #000000;
}

.containers {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.scrollable-div {
  overflow-y: scroll;
  width: 250px;
  height: 300px;
}

.bubble-container {
  position: relative;
  height: 400px;
}

/* .bubble-container {
  position: fixed;
  top: -150px;
  right: -350px;
  width: 300px;
  height: 500px;
  overflow-y: auto;
} */

.pos {
  position: relative;
  top: 180px;
  left: 280px;
}
.tb-bg {
  background-color: #a5dfcb;
}
</style>
