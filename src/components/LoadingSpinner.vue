<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.loader-container {
  width: 100%;
  height: 100%;
  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--dark-peach);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  animation: l1 2s infinite cubic-bezier(0.3, 1, 0, 1);
}
@keyframes l1 {
  33% {
    border-radius: 0;
    background: var(--dark-ocean);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  66% {
    border-radius: 0;
    background: var(--candle);
    clip-path: polygon(50% 0, 50% 0, 100% 100%, 0 100%);
  }
}
</style>
