<template>
  <section>
    <h1>Report issue</h1>
  </section>
  <div class="text-center">
    <FormKit
        type="form"
      @submit="issueSubmit"
      >
      <FormKit
        type="select"
        label="Issue"
        placeholder="Select the type of issue"
        :options="[{label:'Return',value:'return'}, 
        {label:'Refund',value:'refund'},
        {label:'Cancellation',value:'cancellation'}]"
        v-model="issueDetails.issue"
        validation="required"
      >
      </FormKit>

      <FormKit
        type="select"
        label="Status"
        placeholder="Status"
        :disabled="true"
        :options="[{label:'active',value:'active'},
      {label:'resolved',value:'resolved'}
      ]"
      
        v-model="issueDetails.status"
      >
      </FormKit>
    
    <FormKit 
    type="textarea" 
    label="Concern" 
    placeholder="Please explain your concern in detail..."
    v-model="issueDetails.concern"
    validation="required"
     ></FormKit>

    </FormKit>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import type { IGetIssueDetails } from "@/interfaces/report-issue";
import auctionService from "@/services/auctionService";
const details = localStorage.getItem("userDetails");
const { userId } = JSON.parse(details);



let issueDetails =reactive<IGetIssueDetails>({
  issue:"",
  status:"",
  concern:"",
});


onMounted(async () => {
  await auctionService.getReport(userId);

});

const issueSubmit = () => {
  auctionService.postReport(userId,issueDetails.issue,issueDetails.concern);

  //console.log(response);
  issueDetails.status="active";
  //console.log(issueDetails.concern);
  //console.log("issue submitted");
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  console.log("reload")
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
</style>

