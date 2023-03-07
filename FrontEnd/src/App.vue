<template>
  <!-- <h1>{{ $route.path }}</h1> -->
  <Navigation />
  <RouterView />
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { defineComponent, onMounted } from "vue";
import Navigation from "../src/components/navigation/Navigation.vue";
export default defineComponent({
  components: { Navigation },
  setup() {
    const route = useRoute();
    // const path = computed(() =>route.path)
    return {};
  },
});
</script>
<style>
body {
  box-sizing: border-box;
}
</style>
