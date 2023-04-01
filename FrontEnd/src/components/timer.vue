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
      console.log(propValue.value);
      propValue.value--;
      // emit("time", propValue.value);
      progress.value = ((3600 - propValue.value) / 3600) * 100;
      if (propValue.value == 0) {
        clearInterval(timerInterval.value);
        console.warn("Timer ended");
        // Handle timer completion here
      }
    }, 1000);
  }
};

const pad = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

onMounted(() => {
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
<!-- <template>
  <div class="timer-container">
    <div class="timer-progress" :style="{ width: timerProgress + '%' }"></div>
    <div class="timer">
      {{ formatTime(timeLeft) }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 10, // time in seconds
      timerProgress: 100, // progress bar width in percentage
      timerInterval: null,
    };
  },
  created() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timerProgress = (this.timeLeft / 60) * 100;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  },
  methods: {
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    },
  },
};
</script>

<style>
.timer-container {
  width: 300px;
  height: 40px;
  position: relative;
}

.timer-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #4caf50;
  transition: width 1s linear;
}

.timer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}
</style> -->
