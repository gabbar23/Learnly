<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-section">
    <div>
      <h3>Live Bidding</h3>
      <Carousel>
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide>
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
          <div>Closing At:</div>

          <div>Current Max:</div>
          <div class="d-flex">
            <label>Bid:</label><FormKit type="text" class="box" />
            <div>
              <button class="btn btn-danger">Submit Bid</button>
            </div>
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
export default defineComponent({
  components: { Navigation, Carousel, Slide, Pagination },
});
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
</style>
