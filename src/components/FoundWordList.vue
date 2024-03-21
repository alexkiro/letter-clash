<template>
  <div class="found-words">
    <div v-for="(words, wordLength) in wordsByLength" :key="wordLength" class="word-group">
      <div class="group-title">{{ wordLength }} letters - {{ words.length }}</div>
      <div class="word-list">
        <span
          v-for="word in Array.from(words).reverse()"
          :key="word"
          :data-word="word"
          :class="{ highlight: (highlightWords ?? []).indexOf(word) !== -1 }"
        >
          {{ word }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  foundWords: {
    required: true,
    type: Array<string>,
  },
  highlightWords: {
    required: false,
    type: Array<string>,
    default: null,
  },
});
const wordsByLength = computed(() => {
  const result: Record<number, string[]> = {};
  for (const word of props.foundWords) {
    result[word.length] ??= [];
    result[word.length].push(word);
  }
  return result;
});
</script>

<style scoped>
.found-words {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.found-words > *:first-child {
  margin-top: auto;
}

.word-group {
  margin-bottom: 0.5rem;
}

.group-title {
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.word-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  letter-spacing: normal;
}

.word-list span {
  font-size: 16px;
  background-color: white;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  padding: 0.25rem;
  box-shadow: 1px 2px #000;
}

.word-list span.highlight {
  background-color: var(--ocean);
  color: white;
}
</style>
