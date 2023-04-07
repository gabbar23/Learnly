<template>
  <div class="timer" v-if="timeLeft > 0">
    <div class="timer-value">{{ formattedTime }}</div>
    <div class="timer-bar">
      <div class="timer-progress" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const timerInterval = ref<number>(0);
const progress = ref<number>(0);
const emit = defineEmits(["time", "submit"]);

clearInterval(timerInterval.value);

let props = defineProps({
  timeLeft: {
    type: Number,
    required: true,
    default: 100,
  },
});

const formattedTime = computed(() => {
  const hours = Math.floor(props.timeLeft / 3600);
  const minutes = Math.floor((props.timeLeft % 3600) / 60);
  const seconds = props.timeLeft % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
});

const startTimer = () => {
  if (props.timeLeft > 0) {
    const propValue = ref<number>(props.timeLeft);
    timerInterval.value = setInterval(() => {
      propValue.value--;
      emit("time", propValue.value);
      progress.value = ((3600 - propValue.value) / 3600) * 100;
      progress.value *= -1;
      if (propValue.value == 0) {
        clearInterval(timerInterval.value);
        console.warn("Timer ended");
      }
    }, 1000);
  }
};

const pad = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

onMounted(() => {
  console.warn(props.timeLeft);
  startTimer();
});
</script>

<style>
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
}

.timer-value {
  font-size: 3rem;
}

.timer-bar {
  width: 80%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-top: 10px;
}

.timer-progress {
  height: 100%;
  background-color: #ff5722;
  border-radius: 5px;
  transition: width 1s linear;
}
</style>
