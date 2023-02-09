<template>
  <p>Address Comps</p>
  <FormKit type="text" label="Address Line 1" validation="required|alpha" />

  <FormKit type="text" label="Address Line 2" validation="required|alpha" />

  <FormKit
    type="select"
    label="Select City"
    :options="[]"
    validation="required|alpha"
  />

  <FormKit
    type="select"
    label="State"
    :options="[]"
    validation="required|alpha"
  />

  <FormKit type="text" label="Postal Zip Code" validation="required|alpha" />
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "addressComp",
  components: {},
  data() {
    let data = "20";
    return {
      data,
    };
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
<style></style>
