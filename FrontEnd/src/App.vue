<template>
  <Navigation />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "./components/navigation.vue";
export default defineComponent({
  components: { Navigation },
});
</script>
<style>
body{
  margin:1em;
}
</style>
