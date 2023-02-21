// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="main-section">
    <div class="banner"><h3>Bid For Good</h3></div>
    <div class="bottom-btn">
        <button type="button" @click="bid()" class="btn btn-primary">
        Bid An Item
      </button>
      <button type="button" @click="auction()" class="btn btn-primary">
        Blind Auction
      </button>
      <button type="button" @click="sell()" class="btn btn-primary">
        Simply Sell
      </button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import router from '@/router';
export default {
  setup() {
    const sell = () => {
      console.log("Sell");
    };

    const auction = () => {
      console.log("Auction");
    };

    const bid = () => {
      console.log("Auction");
      router.push('/sell-item');
    };

    return {
      sell,
      auction,
      bid,
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
