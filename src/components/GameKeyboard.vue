<template>
  <div class="available-letters">
    <button
      v-for="letter in currentGame"
      :key="letter"
      :disabled="userInput.indexOf(letter) !== -1"
      class="available-letter brutal-border"
      @click="$emit('addLetter', letter)"
    >
      {{ letter }}
    </button>
    <button class="available-letter brutal-border" @click="$emit('removeLetter')">←</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    userInput: {
      type: String,
      required: true,
    },
    currentGame: {
      type: String,
      required: true,
    },
  },
  emits: ["addLetter", "removeLetter"],
});
</script>

<style scoped></style>
