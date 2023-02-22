<template>
  <Navigation />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "../src/components/navigation/Navigation.vue";
export default defineComponent({
  components: { Navigation },
});
</script>
<style>
body {
  box-sizing: border-box;
}
</style>
