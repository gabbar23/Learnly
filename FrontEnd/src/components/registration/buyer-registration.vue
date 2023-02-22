<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="main">
    <section class="side-bar">
      <div>Details</div>
      <div>Donations</div>
      <div>Orders</div>
      <div>Report</div>
    </section>
    <section>
      <router-view></router-view>
    </section>
  </div>

  
</template>
<script lang="ts">
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
