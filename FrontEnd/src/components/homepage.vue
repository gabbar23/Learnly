// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="main-section">
    <h2>Home Page</h2>
    <div class="banner"><h3>Bid For Good</h3></div>
    <div class="bottom-btn">
      <button type="button" @click="auction()" class="btn btn-primary">
        Check Near By Auction
      </button>
      <button type="button" @click="sell()" class="btn btn-primary">
        Sell Your Item
      </button>
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
.main-section {
  /* height: 90vh; */
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
