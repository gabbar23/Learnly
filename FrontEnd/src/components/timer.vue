<template>
  <div class="timer">
    <div class="timer-value">{{ formattedTime }}</div>
    <div class="timer-bar">
      <div class="timer-progress" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 30, 
      timerInterval: null,
      progress: 0,
    };
  },
  computed: {
    formattedTime() {
      const hours = Math.floor(this.timeLeft / 3600);
      const minutes = Math.floor((this.timeLeft % 3600) / 60);
      const seconds = this.timeLeft % 60;
      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    },
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timeLeft--;
        this.progress = ((3600 - this.timeLeft) / 3600) * 100;
        if (this.timeLeft === 0) {
          clearInterval(this.timerInterval);
          // Handle timer completion here
        }
      }, 1000);
    },
    pad(value) {
      return value < 10 ? `0${value}` : value;
    },
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
};
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
