<template>
  <section>
    <h1>Order Details</h1>
  </section>
  <section>
    <v-table class="fullWidth fullHeight">
      <thead>
        <tr>
          <th id="order_name" class="text-left">Name</th>
          <th id="order_description" class="text-left">Description</th>
          <th id="order_price" class="text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        <template  v-if="orderDetails.length > 0">
          <tr v-for="item in orderDetails" :key="item.cityName">
            <td>{{ item.itemName }}</td>
            <td>{{ item.itemDes }}</td>
            <td>{{ item.startPrice }}</td>
          </tr>
        </template>
        <no-content
          v-else
          :message="'No Buyer Orders Available at the Moment'"
        ></no-content>
      </tbody>
    </v-table>
  </section>
</template>
<script lang="ts" setup>
import AuthService from "@/services/AuthService";
import { onMounted, ref } from "vue";
import NoContent from "../no-content.vue";

const orderDetails = ref<any>([]);
const details:any = localStorage.getItem("userDetails");
const { userId } = JSON.parse(details);

onMounted(async () => {
  try {
    const response = await AuthService.getBuyerOrderDetails(userId);
    orderDetails.value = response.data;
  } catch (e) {
    console.error("Error in fetching states", e);
  }
});
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
</style>
