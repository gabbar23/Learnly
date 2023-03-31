<template>
    <div style="display: flex; justify-content: flex-end ;margin-right: 100px;">
    <button class="issueListButton" @click="issueList">
    </button>
  </div>
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
      <template v-if="verifiedSellers.length > 0">
        <tr v-for="item in verifiedSellers" :key="item.cityName">
          <td>{{ item.firstName }} {{ item.lastName }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.loginDetail?.email }}</td>
          <td>{{ item.phone }}</td>
          <td>
            <!-- <div v-if="!item.editInProgress">
              <button @click="item.editInProgress = !item.editInProgress">
                Show ID
              </button>
            </div>
            <div v-else class="d-flex">
              <button @click="item.editInProgress = !item.editInProgress">
                Hide ID
              </button>
              <img src="{{ item.govtIdUrl }}" />
            </div> -->
          </td>
          <td>
            <button class="btn btn-primary" @click="approve(item)">
              Approve
            </button>
            <button class="ml-2 btn btn-danger" @click="decline(item)">
              Decline
            </button>
          </td>
        </tr>
      </template>
      <no-content
        v-else
        :message="'No Sellers available to Approve'"
      ></no-content>
    </tbody>
  </v-table>
  <div>
    <!-- <v-pagination v-model="page" :length="pageCount"></v-pagination> -->
  </div>
</template>
<script lang="ts" setup>
import type {
  IApproveOrDeclineReqPayload,
  IVerfiedSeller,
} from "@/interfaces/admin";
import AuthService from "@/services/AuthService";
import { onMounted, ref } from "vue";
import NoContent from "../components/no-content.vue";
import { useNotification } from "@kyvg/vue3-notification";
import router from "@/router";

const page = 2;
const pageCount = 10;
const verifiedSellers = ref<IVerfiedSeller[]>([]);
const { notify } = useNotification();
const isLoading = ref<boolean>(false);

const getRegisteredSellers = async()=>{
  try {
    verifiedSellers.value = [];
    isLoading.value = true;
    const response = await AuthService.verifiedSellers();
    verifiedSellers.value = response.data;
    verifiedSellers.value.map((seller) => {
      return {
        editInProgress: false,
      };
    });
  } catch (e) {
    notify({
      title: "Failure!",
      text: "Fetching Registered Seller Operations Failed!",
      type: "error",
    });
  }finally{
    isLoading.value = false;
  }
}

onMounted(async () => {
  getRegisteredSellers();
});

const issueList = () => {
  router.push("/admin-issue-details");
};
const approveOrDecline = async (payload: IApproveOrDeclineReqPayload) => {
  try {
    await AuthService.approveOrDeclineSeller(payload);
    notify({
      title: "Successfull!",
      text: "Operation Success full!",
      type: "success",
    });
  } catch (e) {
    notify({
      title: "Failure!",
      text: "Operation Failed!",
      type: "error",
    });
    console.error("Error in verifying seller");
  }
};

const approve = async(seller: IVerfiedSeller) => {
  console.warn(seller);
  const reqPayload: IApproveOrDeclineReqPayload = {
    userId: seller.userId,
    isVerified: true,
  };
  await approveOrDecline(reqPayload);
  await getRegisteredSellers();
};

const decline = async (seller: IVerfiedSeller) => {
  console.warn(seller);
  const reqPayload: IApproveOrDeclineReqPayload = {
    userId: seller.userId,
    isVerified: false,
  };
  await approveOrDecline(reqPayload);
  await getRegisteredSellers();
};
</script>
<style scoped>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.issueListButton {
  background: url(../../src/assets/triangle-exclamation-solid.svg) no-repeat top left;
  background-size: contain;
  cursor: pointer;
  display: inline-block;
  height: 52px;
  width: 40px;
}
</style>
