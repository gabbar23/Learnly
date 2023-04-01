<template>
  <section>
    <h1>Report issue</h1>
  </section>
  <div>
    <div class="text-center">
      <v-table>
        <thead>
          <tr>
            <th class="text-center">Issue ID</th>
            <th class="text-center">Issue Type</th>
            <th class="text-center">Description</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="issueList.length > 0">
            <tr v-for="(item, index) in issueList" :key="index">
              <td class="text-center">
                {{ item.issue }}
              </td>
              <td class="text-left">
                {{ item.issueType.toUpperCase() }}
              </td>
              <td class="text-left">
                {{ item.concern }}
              </td>
              <td class="text-center">
                <FormKit
                  class="text-center"
                  type="text"
                  placeholder="Status"
                  :disabled="true"
                  :options="[
                    { label: 'active', value: 'active' },
                    { label: 'resolved', value: 'resolved' },
                  ]"
                  v-model="item.status"
                />
              </td>
            </tr>
          </template>
          <no-content v-else :message="'No Issues Reported'"></no-content>
        </tbody>
      </v-table>
      <br />
      <br />
      <br />
      <br />
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

const details: any = localStorage.getItem("userDetails");
const { userId } = JSON.parse(details);

const route = useRoute();

const issueList = ref<any>([]);

onMounted(async () => {
  const { itemId, auctionId, auctionType } = route.query;
  const response = await auctionService.getReport(userId);
  issueList.value = response.data.map((item: any) => ({
    issue: item.ticketId,
    status: item.isResolved ? "resolved" : "active",
    concern: item.description,
    issueType: item.issueType,
  }));
});
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
