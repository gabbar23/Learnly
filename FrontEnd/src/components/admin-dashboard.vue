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
      <tr v-for="item in verifiedSellers" :key="item.cityName">
        <td>{{ item.firstName }} {{ item.lastName }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.loginDetail?.email }}</td>
        <td>{{ item.phone }}</td>
        <td>
          <button class="btn btn-primary" @click="approve(item)">
            Approve
          </button>
          <button class="ml-2 btn btn-danger" @click="decline(item)">
            Decline
          </button>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div>
    <v-pagination v-model="page" :length="pageCount"></v-pagination>
  </div>
</template>
<script lang="ts" setup>
import type {
  IApproveOrDeclineReqPayload,
  IVerfiedSeller,
} from "@/interfaces/admin";
import AuthService from "@/services/AuthService";
import { onMounted, ref } from "vue";

const page = 2;
const pageCount = 10;
const verifiedSellers = ref<IVerfiedSeller[]>([]);

onMounted(async () => {
  try {
    const response = await AuthService.verifiedSellers();
    verifiedSellers.value = response.data;
  } catch (e) {
    console.error("Error in fetching states", e);
  }
});

const approve = async (seller: IVerfiedSeller) => {
  console.warn(seller);
  const reqPayload: IApproveOrDeclineReqPayload = {
    userId: seller.userId,
    isVerified: true,
  };
  await AuthService.approveOrDeclineSeller(reqPayload);
};

const decline = async (seller: IVerfiedSeller) => {
  console.warn(seller);
  const reqPayload: IApproveOrDeclineReqPayload = {
    userId: seller.userId,
    isVerified: false,
  };
  await AuthService.approveOrDeclineSeller(reqPayload);
};
</script>
<style>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
