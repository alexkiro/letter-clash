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

<style>
.available-letters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.available-letter {
  background-color: white;
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  width: 2em;
  height: 2em;

  cursor: pointer;
}

.available-letter:hover {
  background-color: var(--peach);
}

.available-letter:disabled {
  background-color: var(--ocean);
  color: white;
}
</style>
