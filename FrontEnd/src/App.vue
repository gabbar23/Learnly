<template>
  <Navigation />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "./components/Navigation.vue";
export default defineComponent({
  components: { Navigation },
});
</script>
<style>
.form-group {
  padding: 0.2em;
}
</style>
