<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Address</th>
        <th class="text-left">Email</th>
        <th class="text-left">Phone</th>
        <th class="text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>
          <button class="btn btn-primary" @click="approve(item)">Approve</button>
          <button class="ml-2 btn btn-danger" @click="decline(item)">Decline</button>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div>
    <v-pagination v-model="page" :length="pageCount"></v-pagination>
  </div>
</template>
<script lang="ts" setup>
import AuthService from "@/services/AuthService";
import { onMounted, reactive, ref } from "vue";

const page = 2;
const pageCount = 10;

onMounted(async () => {
  try {
    const verifiedSellers = await AuthService.verifiedSellers();
  } catch (e) {
    console.error("Error in fetching states", e);
  }
});
</script>
<style>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
