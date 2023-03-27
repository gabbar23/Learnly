<template>
  <!-- <h1>{{ $route.path }}</h1> -->
  <notifications />
  <Navigation />
  <RouterView />
</template>

<script lang="ts" setup>
import Navigation from "../src/components/navigation/Navigation.vue";
</script>
<style>
body {
  box-sizing: border-box;
}
</style>
