<template>
  <div
    class="bubble"
    :style="{
      top: top + 'px',
      left: left + 'px',
      width: size + 'px',
      height: size + 'px',
    }"
  >
    <div class="bubble-content">
      <p class="name">{{ name }}</p>
      <p class="cost">{{ cost }} $</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  top: {
    type: Number,
    required: true,
  },
  left: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
/* .bubble {
  position: absolute;
  border-radius: 50%;
  background-color: #265d81;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  animation: bubble 2s infinite;
} */

.bubble {
  position: absolute;
  border-radius: 50%;
  background-color: #ff7f50;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: bubble 4s infinite;
}

.bubble .bubble-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bubble .name {
  margin: 0;
  font-weight: bold;
}

.bubble .cost {
  margin: 0;
  font-size: 0.9rem;
}

@keyframes bubble {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}
</style>
