<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-section w-50 mx-auto m-2">
    <loader v-if="isLoading"></loader>
    <template v-else>
      <h3>Blind Auction</h3>
      <Carousel>
        <template v-if="sellItemDetail.imageDetails.length > 0">
          <Slide
            v-for="(item, index) in sellItemDetail.imageDetails"
            :key="index"
          >
            <img
              :src="item.imgUrl"
              class="carousel__item item_size"
              @click="bindClick(item)"
            />
          </Slide>
        </template>
        <template v-else>
          <Slide v-for="slide in 5" :key="slide">
            <div class="carousel__item" @click="bindClick(slide)">
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
    <div>
      <div>
        <div class="details">
          <p></p>
          <div class = "d-flex">
            <div class = "mr-4">Make Bid</div>
            <FormKit  type="text" />
            <button class="btn btn-danger ml-5" @click="printConsole()" :disabled = "isItemSold" >Submit Bid</button>
            <p>Bid Already Made.</p>
          </div>
        </div>
      </div>
    </div>
  </div><h1>{{ route.query }}</h1>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import "vue3-carousel/dist/carousel.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useRoute } from "vue-router";
const isItemSold = ref<boolean>(false);

  const route = useRoute();
  

function printConsole() {
console.log(route.query)
}
</script>

<style>
.main-section {
  border: 1px solid;
  width: 50vw;
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

.item_size {
  height: 300px;
}
</style>
