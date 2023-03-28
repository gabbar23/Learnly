<template>
    <section>
      <h1>Wishlist</h1>
    </section>
    <section>
      <v-table>
        <thead>
          <tr>
            <th></th>
            <th class="text-left">Name</th>
            <th class="text-left">Description</th>
            <th class="text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="wishDetails.length > 0">
            <tr v-for="item in wishDetails" :key="item.cityName">
              <button id="stuff.item"
        class="wishlist-svg-selected"
        @click="RemoveWishlist"
      >
    </button>
              <td>{{ item.itemName }}</td>
              <td>{{ item.itemDes }}</td>
              <td>{{ item.startPrice }}</td>
            </tr>
          </template>
          <no-content
            v-else
            :message="'No items Wishlisted'"
          ></no-content>
        </tbody>
      </v-table>
    </section>
  </template>
  <script lang="ts" setup>
  import auctionService from "@/services/auctionService";
import { button } from "@formkit/inputs";
  import { onMounted, reactive, ref } from "vue";
  import NoContent from "../no-content.vue";
  
  const wishDetails=ref<any>([]);
  const details = localStorage.getItem("userDetails");
  const { userId } = JSON.parse(details);
 // let item=0;
 let stuff=reactive<any>({
  item:0
 })
 // const itemId=wishDetails.value[item].itemId;
  onMounted(async () => {
    try {
        console.log(userId);
      const response =await auctionService.getWishlist(userId);
      wishDetails.value = response.data;
    } catch (e) {
      console.error("Error in fetching states", e);
    }
  });



  const RemoveWishlist = () => {
    console.log("wishlist removed");
    console.log(wishDetails.value);
    console.log(wishDetails.value[0].itemId);
    //console.log(itemId);
    //let response=auctionService.deleteWishlist(itemId,userId);
  };
  </script>
  <style scoped>
  .side-bar > div {
    cursor: pointer;
    border: 1px solid;
  }
  .parent_sect {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  .main {
    display: grid;
    grid-template-columns: 20% 80%;
  }

  .wishlist-svg{
  background: url(../../assets/heart-regular.svg) no-repeat top left;
    background-size: contain;
    cursor: pointer;
    display: inline-block;
    height: 52px;
    width: 40px;
}
.wishlist-svg-selected{
  background: url(../../assets/heart-solid.svg) no-repeat top left;
    background-size: contain;
    cursor: pointer;
    display: inline-block;
    height: 52px;
    width: 40px;

}

  </style>
  