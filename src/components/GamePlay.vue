<script setup lang="ts">
import { type Ref, computed, onMounted, ref } from "vue";

import gameList from "@/assets/words/game-list.json";
import wordList from "@/assets/words/word-list.json";
import { difference, isSuperset, randomChoice, shuffle } from "@/lib/utils";

const alphabet: Set<string> = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

const currentGame: Ref<string> = ref("");
const userInput: Ref<string> = ref("");
const foundWords: Ref<string[]> = ref([]);
const solutions = computed(() => {
  const game = new Set(currentGame.value);
  return new Set(wordList.filter((word) => isSuperset(game, word)));
});
const wordsByLength = computed(() => {
  const result: Record<number, string[]> = {};
  for (const word of foundWords.value) {
    result[word.length] ??= [];
    result[word.length].push(word);
  }
  return result;
});

function getNewGame(): string {
  const game = Array.from(randomChoice(gameList));
  const missingLetters = 7 - game.length;

  if (missingLetters > 0) {
    const availableLetters = difference(alphabet, new Set(game));
    for (let i = 0; i < missingLetters; i += 1) {
      const choice = randomChoice(availableLetters);
      availableLetters.delete(choice);
      game.push(choice);
    }
  }

  return shuffle(game).join("");
}

function addLetter(value: string) {
  const letter = value.toUpperCase();

  if (userInput.value.indexOf(letter) === -1 && currentGame.value.indexOf(letter) !== -1) {
    userInput.value += letter;
  }
}

function backspace() {
  userInput.value = userInput.value.slice(0, -1);
}

function submitWord() {
  const word = userInput.value.toUpperCase();
  if (solutions.value.has(word)) {
    foundWords.value.push(word);
  }
  userInput.value = "";
}

// function cheat() {
//   for (const word of Array.from(solutions.value)) {
//     userInput.value = word;
//     submitWord();
//   }
// }

function resetGame() {
  userInput.value = "";
  currentGame.value = getNewGame();
  foundWords.value = [];
  // cheat();
}

function handleKeyboardEvents(event: KeyboardEvent) {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  switch (event.key) {
    case "Enter":
      submitWord();
      break;
    case "Backspace":
      backspace();
      break;
    case "Del":
    case "Delete":
    case "Esc":
    case "Escape":
      userInput.value = "";
      break;
    default:
      addLetter(event.key);
  }
}

onMounted(resetGame);
onMounted(() => {
  window.addEventListener("keyup", handleKeyboardEvents);
});
</script>

<template>
  <div class="game-container">
    <input autocomplete="off" class="user-input" placeholder="..." readonly type="text" v-model="userInput" />
    <div class="found-words">
      <div :key="wordLength" class="word-group" v-for="(words, wordLength) in wordsByLength">
        <div class="group-title">{{ wordLength }} letters - {{ words.length }}</div>
        <div class="word-list">
          <span :key="word" v-for="word in Array.from(words).reverse()">{{ word }}</span>
        </div>
      </div>
    </div>
    <div class="available-letters">
      <button
        :class="{
          selected: userInput.indexOf(letter) !== -1,
        }"
        :key="letter"
        @click="addLetter(letter)"
        class="available-letter"
        v-for="letter in currentGame"
      >
        {{ letter }}
      </button>
      <button @click="backspace" class="available-letter">←</button>
    </div>
    <button :disabled="userInput.length < 2" @click="submitWord" class="submit-btn" type="submit">Submit</button>
  </div>
</template>

<style scoped>
.game-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 768px;
  margin: auto;

  padding: 1rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content min-content;
}

.user-input {
  width: 100%;
  font-size: 42px;
  font-weight: bold;
  letter-spacing: 0.2em;
  border: 4px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 2px 4px #000;
  padding: 0.5rem 2rem;
  outline: none;
}

.found-words {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.word-group {
  overflow: hidden;
}

.group-title {
  font-weight: bold;
  line-height: 1.3;
}

.word-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  letter-spacing: normal;
}

.word-list span {
  font-size: 14px;
  background-color: white;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  padding: 0.25rem;
  box-shadow: 1px 2px #000;
}

.available-letters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.available-letter {
  background-color: white;
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  border: 4px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 2px 4px #000;

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

.available-letter.selected {
  background-color: var(--ocean);
  color: white;
}

.submit-btn {
  padding: 0.5rem;
  width: 100%;

  background-color: var(--ocean);
  color: white;

  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  border: 4px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 2px 4px #000;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: var(--dark-ocean);
}

.submit-btn:disabled {
  filter: grayscale();
}
</style>
