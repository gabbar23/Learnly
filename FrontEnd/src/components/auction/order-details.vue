<template>
  <section>
    <h1>Order Details</h1>
  </section>
  <section>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Address</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Identity Doc</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="orderDetails.length > 0">
          <tr v-for="item in orderDetails" :key="item.cityName">
            <td>{{ item.firstName }} {{ item.lastName }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.loginDetail?.email }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <div v-if="!item.editInProgress">
                <button @click="item.editInProgress = !item.editInProgress">
                  Show ID
                </button>
              </div>
              <div v-else class="d-flex">
                <button @click="item.editInProgress = !item.editInProgress">
                  Hide ID
                </button>
                <img src="{{ item.govtIdUrl }}" />
              </div>
            </td>
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
onMounted(async () => {
  try {
    const buyerUserId = "123";
    orderDetails.value = await AuthService.getBuyerOrderDetails(buyerUserId);
  } catch (e) {
    console.error("Error in fetching states", e);
  }
});
</script>
<style>
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
