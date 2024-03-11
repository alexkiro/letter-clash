<template>
  <hr />
  <div>
    <p>Available letters:</p>
    <br />
    <p style="font-family: monospace; font-size: 2rem; letter-spacing: 1em">{{ currentGame }}</p>
  </div>
  <hr />
  <form @submit.capture.prevent="submitWord">
    <input autofocus placeholder="Type in word" required v-model="userInput" />
    <button type="submit">Submit</button>
  </form>
  <br />
  <form @submit.capture.prevent="resetGame">
    <button type="submit">New Game</button>
  </form>
  <br />
  <div style="display: grid; grid-template-columns: repeat(6, 1fr)">
    <ul :key="wordLength.toString()" v-for="(words, wordLength) in foundWords">
      <li>
        <b>{{ wordLength }} letter:</b>
      </li>
      <li :key="word" v-for="word in words">
        {{ word }}
      </li>
    </ul>
  </div>
  <hr />
  <!--  <div>-->
  <!--    Solutions:-->
  <!--    <ul style="columns: 6">-->
  <!--      <li :key="word" v-for="word in solutions">-->
  <!--        {{ word }}-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import { type Ref, computed, onMounted, ref } from "vue";

import gameList from "@/assets/words/game-list.json";
import wordList from "@/assets/words/word-list.json";
import { difference, isSuperset, randomChoice, shuffle } from "@/lib/utils";

const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const currentGame: Ref<string> = ref("");
const userInput: Ref<string> = ref("");
const foundWords: Ref<Record<number, string[]>> = ref({});
const solutions = computed(() => {
  const game = new Set(currentGame.value);
  return new Set(wordList.filter((word) => isSuperset(game, word)));
});

function getNewGame(): string {
  const game = Array.from(randomChoice(gameList));
  const missingLetters = 7 - game.length;

  if (missingLetters > 0) {
    const availableLetters = difference(new Set(alphabet), new Set(game));
    for (let i = 0; i < missingLetters; i += 1) {
      const choice = randomChoice(availableLetters);
      availableLetters.delete(choice);
      game.push(choice);
    }
  }

  return shuffle(game).join("");
}

function submitWord() {
  const word = userInput.value.toUpperCase();
  if (solutions.value.has(word)) {
    foundWords.value[word.length] ??= [];
    foundWords.value[word.length].push(word);
  }
  userInput.value = "";
}

function resetGame() {
  userInput.value = "";
  currentGame.value = getNewGame();
  foundWords.value = {
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  };
}

onMounted(resetGame);
</script>

<style scoped></style>
