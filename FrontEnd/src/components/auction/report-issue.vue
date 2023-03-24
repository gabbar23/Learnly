<template>
  <section>
    <h1>Report issue</h1>
  </section>
  <div class="text-center">
    <FormKit
        type="form"
      
      >
      <FormKit
        type="select"
        label="Issue"
        placeholder="Select the type of issue"
        :options="[{label:'Return',value:'return'}, 
        {label:'Refund',value:'refund'},
        {label:'Cancellation',value:'cancellation'}]"
      >
      </FormKit>

      <FormKit
        type="select"
        label="Status"
        placeholder="Status"
        :options="[{label:'active',value:'active'},
      {label:'resolved',value:'resolved'}
      ]"
      >
      </FormKit>
    
    <FormKit 
    type="textarea" 
    label="Concern" 
    placeholder="Please explain your concern in detail..."
     ></FormKit>

    </FormKit>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    return {};
  },
  props: {
    headerText: {
      type: String,
      default: "header",
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    options: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  setup(props) {},
  methods: {},
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
