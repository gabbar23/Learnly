<template>
  <div class="card w-100">
    <h3>{{ message }}</h3>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  message: {
    type: String,
    default: "Hello This is default Message",
  },
});
console.log(props.message);
</script>
