<template>
    <section class="container parent_sect">
    <FormKit type="text" label="First Name" validation="required|alpha" />

    <FormKit type="text" label="Last Name" validation="required|alpha" />

    <FormKit type="email" label="Email" validation="required|email" />

    <FormKit type="number" label="Phone Number" validation="required|alpha" />

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

    <FormKit type="file" label="Upload Photo" validation="required" />

    <FormKit type="textarea" label="Description" validation="required|alpha" />

    <FormKit
      type="checkbox"
      label="Terms and Conditions"
      name="terms"
      :value="false"
      validation="accepted"
      validation-visibility="dirty"
    />
  </section>
  <div class="text-center">
    <button type="submit" class="btn btn-primary">Submit</button>
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
