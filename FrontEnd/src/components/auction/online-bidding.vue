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
            <div>Closing At: 40$</div>
            <div>Current Max: 40$</div>
            <div class="d-flex">
              <div class="mr-4">Make Bid</div>
              <FormKit
                type="form"
                submit-label="Make Bid"
                :actions="false"
                @submit="makeBid"
              >
                <FormKit type="text" />
                <button class="btn btn-danger ml-5" :disabled="isBidMade">
                  Submit Bid{{ minVal }}
                </button>
                <div v-if="isBidMade">{{ timeLeft }} sec</div>
              </FormKit>
            </div>
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
import Loader from "../loader.vue";

const isBidMade = ref<boolean>(false);
const timeLeft = ref(10); // 60 seconds
let timer: any;
const minVal = ref<Number>(5);
const minValidation = ref<any>({ min: 5 });
const isLoading = ref<boolean>(false);

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
