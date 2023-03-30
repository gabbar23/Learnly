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
          <tr v-for="item in wishDetails">
            <button
              class="wishlist-svg-selected"
              @click="removeFromWishlist(item)"
            ></button>
            <td>{{ item.itemName }}</td>
            <td>{{ item.itemDes }}</td>
            <td>{{ item.startPrice }}</td>
          </tr>
        </template>
        <no-content v-else :message="'No items Wishlisted'"></no-content>
      </tbody>
    </v-table>
  </section>
</template>
<script lang="ts" setup>
import auctionService from "@/services/auctionService";
import { button } from "@formkit/inputs";
import { onMounted, reactive, ref } from "vue";
import NoContent from "../no-content.vue";

const wishDetails = ref<any>([]);
const details: any = localStorage.getItem("userDetails");
const { userId } = JSON.parse(details);
const isWishlisted = ref<boolean>(false);
onMounted(async () => {
  await loadWishlist();
});

async function loadWishlist() {
  try {
    const response = await auctionService.getWishlist(userId);
    wishDetails.value = response.data;
  } catch (e) {
    console.error("Error in fetching wishlist", e);
  }
}

async function removeFromWishlist(item: any) {
  console.log(item.itemId);
  console.log("wishlist removed");
  await auctionService.deleteWishlist(item.itemId, userId);
  await loadWishlist();
}
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

.wishlist-svg {
  background: url(../../assets/heart-regular.svg) no-repeat top left;
  background-size: contain;
  cursor: pointer;
  display: inline-block;
  height: 52px;
  width: 40px;
}
.wishlist-svg-selected {
  background: url(../../assets/heart-solid.svg) no-repeat top left;
  background-size: contain;
  cursor: pointer;
  display: inline-block;
  height: 52px;
  width: 40px;
}
</style>
