<template>
    <div style="display: flex; justify-content: flex-end ;margin-right: 100px;">
    <button class="dashboardButton" @click="dashboard">
    </button>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Issue ID</th>
          <th class="text-left">Issue Type</th>
          <th class="text-left">Issue Concern</th>
          <th class="text-left">Issue Status</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
         <template v-if="issueDetails.length > 0">
        <tr v-for="item in issueDetails">
            <td>{{ item.ticketId }}</td>
            <td>{{ item.issueType}}</td>
            <td>{{ item.description }}</td>
            <td>{{item.isResolved?'resolved':'active' }}</td>
            <td>
              <button
              class="ml-2 btn btn-danger" @click="decline(item)">
                Close Ticket
              </button>
            </td> 
          </tr> 
        </template> 
        <no-content
          v-else
          :message="'No issues reported'"
        ></no-content> 
      </tbody>
    </v-table>
  </template>
 
  <script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import NoContent from "../components/no-content.vue";
  import { useNotification } from "@kyvg/vue3-notification";
import auctionService from "@/services/auctionService";
import router from "@/router";

  const issueDetails = ref<any>([]);
  const { notify } = useNotification();
  const details: any = localStorage.getItem("userDetails");
const { userId } = JSON.parse(details);

let buttonDisable=ref<String>();
  const isLoading = ref<boolean>(false);

  onMounted(async () => {
    getIssueList();
  });


  const getIssueList = async()=>{
    try {
      issueDetails.value = [];
      isLoading.value = true;
      const response = await auctionService.getAllReports();
      issueDetails.value = response.data;
      
    } catch (e) {
      notify({
        title: "Failure!",
        text: "Fetching Issue List Operations Failed!",
        type: "error",
      });
    }finally{
      isLoading.value = false;
    }
  }
  
  const dashboard = () => {
  router.push("/admin-dashboard");
};

  const decline = async (item:any) => {
    console.log("clicked");
    item.isResolved=true;
    await auctionService.updateReport(item.ticketId , item.isResolved);
    console.log(item);
    buttonDisable.value="true";
    await getIssueList();
  };
  </script>
  <style scoped>
  .parent_sect {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .dashboardButton {
  background: url(../../src/assets/layer-group-solid.svg) no-repeat top left;
  background-size: contain;
  cursor: pointer;
  display: inline-block;
  height: 52px;
  width: 40px;
}
  </style>
  