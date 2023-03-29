<template>
    <section>
      <h1>Report issue</h1>
    </section>
    <div class="parent_sect">
      <div class="text-center">
        <v-table>
          <tbody>
            <template v-if="issueList.length > 0">
              <tr v-for="item in issueList">
                <td>
                  <FormKit
                    type="text"
                    label="Issue ID"
                    :disabled="true"
                    v-model="item.issue"
                  />
                  <FormKit
                    type="text"
                    label="Issue Type"
                    :disabled="true"
                    v-model="item.issueType"
                  />
                  <FormKit
                    type="text"
                    label="Status"
                    placeholder="Status"
                    :disabled="true"
                    :options="[
                      { label: 'active', value: 'active' },
                      { label: 'resolved', value: 'resolved' }
                    ]"
                    v-model="item.status"
                  />

                  <FormKit
                    type="textarea"
                    label="Concern"
                    :disabled="true"
                    placeholder="Please explain your concern in detail..."
                    v-model="item.concern"
                  />
                </td>

              </tr>
            </template>
            <no-content
            v-else
            :message="'No Issues Reported'"
          ></no-content>
          </tbody>
        </v-table>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import "vue3-carousel/dist/carousel.css";
  import { onMounted, ref, reactive } from "vue";
  import { useRoute } from "vue-router";
  import type { IGetIssueDetails } from "@/interfaces/report-issue";
  import auctionService from "@/services/auctionService";
  import type { IssueTrack } from "../component";
  import NoContent from "../no-content.vue";


  const details = localStorage.getItem("userDetails");
  const { userId } = JSON.parse(details);
  
  const route = useRoute();
  
  const issueList = ref<any>([]);
  
  onMounted(async () => {
    const { itemId, auctionId, auctionType } = route.query;
    const response = await auctionService.getReport(userId);
    issueList.value = response.data.map((item: any) => ({
      issue: item.ticketId,
      status: "active",
      concern: item.description,
      issueType: item.issueType,
    }));
  });
  
  async function issueSubmit(item) {
    try {
      // Send the issue details to the backend API to update the issue status
      console.log(item);
    } catch (e) {
      console.error("Error in updating issue status", e);
    }
  }
  </script>
  
  <style scoped>
  .side-bar > div {
    cursor: pointer;
    border: 1px solid;
  }
  .parent_sect {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .main {
    display: grid;
    grid-template-columns: 20% 80%;
  }
  </style>
  
  