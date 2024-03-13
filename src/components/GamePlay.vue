<template>
  <div class="game-container">
    <div class="game-header">
      <button class="game-score top-icon brutal-border bg-white">{{ score }}</button>
      <div>
        <button @click="resetGame" class="top-icon brutal-border bg-white">⟳</button>
        <button @click="$emit('close')" class="top-icon brutal-border bg-dark-peach">X</button>
      </div>
    </div>
    <found-word-list :found-words="foundWords" />
    <div>
      <div class="user-input brutal-border">
        <input autocomplete="off" placeholder="..." readonly size="1" type="text" v-model="userInput" />
        <button :disabled="userInput.length < 2" @submit="submitWord" class="submit-btn brutal-border" type="submit">
          ▸
        </button>
      </div>
    </div>
    <div class="available-letters">
      <button
        :class="{
          selected: userInput.indexOf(letter) !== -1,
        }"
        :key="letter"
        @click="addLetter(letter)"
        class="available-letter brutal-border"
        v-for="letter in currentGame"
      >
        {{ letter }}
      </button>
      <button @click="backspace" class="available-letter brutal-border">←</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, computed, nextTick, onMounted, ref } from "vue";

import gameList from "@/assets/words/game-list.json";
import wordList from "@/assets/words/word-list.json";
import FoundWordList from "@/components/FoundWordList.vue";
import { animateShake, animateWiggle } from "@/lib/animations";
import { difference, isSuperset, randomChoice, shuffle } from "@/lib/utils";

const alphabet: Set<string> = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

const currentGame: Ref<string> = ref("");
const userInput: Ref<string> = ref("");
const foundWords: Ref<string[]> = ref([]);
const score = computed(() => {
  let result = 0;
  for (const word of foundWords.value) {
    result += word.length;
  }
  return result;
});
const solutions = computed(() => {
  const game = new Set(currentGame.value);
  return new Set(wordList.filter((word) => isSuperset(game, word)));
});

defineEmits(["close"]);

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

async function submitWord() {
  const word = userInput.value.toUpperCase();
  if (word.length < 2) return;

  userInput.value = "";
  const isValidWord = solutions.value.has(word);

  if (!isValidWord) {
    animateShake(".user-input", "dark-peach");
  } else if (foundWords.value.indexOf(word) === -1) {
    foundWords.value.push(word);
    await nextTick();
    animateWiggle(`[data-word=${word}]`, "ocean");
  } else {
    animateShake(`[data-word=${word}]`, "dark-peach");
  }
}

async function resetGame() {
  userInput.value = "";
  currentGame.value = getNewGame();
  foundWords.value = [];
  // CHEAT!!!
  // for (const word of solutions.value) {
  //   userInput.value = word;
  //   submitWord();
  // }
  await nextTick();

  const colors = ["dark-ocean", "dark-peach", "ocean", "peach"];
  const letters = Array.from(document.querySelectorAll(".available-letter"));
  for (let i = 0; i < letters.length; i += 1) {
    animateWiggle(letters[i], colors[i % 4], { delay: 50 * i });
  }
  animateShake(".game-score", "ocean", { delay: 500 });
  animateShake(".user-input", "ocean", { delay: 1000 });
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

<style scoped>
.game-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 768px;
  margin: auto;
  padding: 1rem 0;

  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content min-content;
}

.game-container > * {
  padding: 0 1rem;
}

.user-input {
  background-color: white;
  padding: 0.5rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

.user-input input {
  display: block;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.2em;
  flex-grow: 1;
  border: none;

  outline: none;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  background-color: var(--dark-ocean);
  width: 2em;
  height: 2em;
  border-radius: 50%;
  color: white;
}

.submit-btn:disabled {
  background-color: #9b9a9a;
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

.available-letter.selected {
  background-color: var(--ocean);
  color: white;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.game-header > * {
  display: flex;
  gap: 0.5rem;
}

.top-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;
  padding: 1rem;
  border-radius: 50%;
  font-size: 18px;
}

.game-score {
  width: 5rem;
  border-radius: 8px;
}
</style>
