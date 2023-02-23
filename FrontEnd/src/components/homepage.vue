// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div>
    <h2>Home Page</h2>
    <div class="main-home-section">
      <div class="main-card card" v-for="slide in 30">
        <div class="img">
          <img src="" alt="" />
        </div>
        <div>
          <div>Description</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            eligendi voluptatum id voluptate dolorem, mollitia esse!
          </div>
          <div>Price</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
</style>
