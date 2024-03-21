<template>
  <div class="game-container">
    <div class="game-header">
      <div>
        <div class="game-score brutal-border bg-white">{{ score }}</div>
        <div class="game-score brutal-border bg-white">{{ displayTimer }}</div>
      </div>
      <div>
        <button v-if="!gameEnd" class="top-icon brutal-border bg-white" @click="gameEnd = true">🏁</button>
        <button v-else class="top-icon brutal-border bg-white" @click="resetGame">⟳</button>
        <router-link :to="{ name: 'home' }" class="top-icon brutal-border bg-dark-peach">X</router-link>
      </div>
    </div>
    <template v-if="gameEnd">
      <found-word-list :found-words="Array.from(solutions)" :highlight-words="foundWords" />
    </template>
    <template v-else>
      <found-word-list :found-words="foundWords" />
      <user-input :user-input="userInput" @submit="submitWord" />
      <game-keyboard
        :current-game="currentGame"
        :user-input="userInput"
        @add-letter="addLetter"
        @remove-letter="backspace"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import gameList from "@/assets/words/game-list.json";
import wordList from "@/assets/words/word-list.json";
import FoundWordList from "@/components/FoundWordList.vue";
import { animateShake, animateWiggle } from "@/lib/animations";
import { difference, isSuperset, randomChoice, shuffle } from "@/lib/utils";
import GameKeyboard from "@/components/GameKeyboard.vue";
import UserInput from "@/components/UserInput.vue";

const alphabet: Set<string> = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

export default defineComponent({
  components: { UserInput, GameKeyboard, FoundWordList },
  props: {
    timer: {
      type: Number,
      required: false,
      default: null,
    },
  },
  emits: {
    close() {
      return true;
    },
  },
  data() {
    return {
      userInput: "",
      currentGame: "",
      startTimeMs: 0,
      currentTimeMs: 0,
      gameEnd: false,
      foundWords: [] as string[],
    };
  },
  computed: {
    solutions(): Set<string> {
      const game = new Set(this.currentGame);
      return new Set(wordList.filter((word) => isSuperset(game, word)));
    },
    score() {
      let result = 0;
      for (const word of this.foundWords) {
        result += word.length;
      }
      return result;
    },
    displayTimer() {
      const elapsedSeconds = Math.floor((this.currentTimeMs - this.startTimeMs) / 1000);
      let displayTime = elapsedSeconds;
      if (this.timer) {
        displayTime = Math.max(0, this.timer - elapsedSeconds);
      }
      const hours = Math.floor(displayTime / 3600);
      const minutes = Math.floor((displayTime % 3600) / 60);
      const seconds = displayTime % 60;
      const result = `${this.padTime(minutes)}:${this.padTime(seconds)}`;

      if (hours) {
        return `${this.padTime(hours)}:${result}`;
      }
      return result;
    },
  },
  mounted() {
    window.addEventListener("keyup", this.handleKeyboardEvents);
    this.resetGame();
    this.updateCurrentTime();
  },
  methods: {
    padTime(nr: number): string {
      return nr.toString().padStart(2, "0");
    },
    updateCurrentTime() {
      this.currentTimeMs = performance.now();
      if (!this.gameEnd) {
        setTimeout(this.updateCurrentTime, 200);
      }
    },
    getNewGame(): string {
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
    },
    addLetter(value: string) {
      const letter = value.toUpperCase();

      if (this.userInput.indexOf(letter) === -1 && this.currentGame.indexOf(letter) !== -1) {
        this.userInput += letter;
      }
    },
    backspace() {
      this.userInput = this.userInput.slice(0, -1);
    },
    async submitWord() {
      if (this.gameEnd) return;
      const word = this.userInput.toUpperCase();
      if (word.length < 2) return;

      this.userInput = "";
      const isValidWord = this.solutions.has(word);

      if (!isValidWord) {
        animateShake(".user-input", "dark-peach");
      } else if (this.foundWords.indexOf(word) === -1) {
        this.foundWords.push(word);
        await this.$nextTick();
        animateWiggle(`[data-word=${word}]`, "ocean");
      } else {
        animateShake(`[data-word=${word}]`, "dark-peach");
      }
    },
    async resetGame() {
      this.gameEnd = false;
      this.startTimeMs = performance.now();
      this.currentTimeMs = this.startTimeMs;
      this.userInput = "";
      this.currentGame = this.getNewGame();
      this.foundWords = [];
      // CHEAT!!!
      // for (const word of solutions) {
      //   userInput = word;
      //   submitWord();
      // }
      await this.$nextTick();

      const colors = ["dark-ocean", "dark-peach", "ocean", "peach"];
      const letters = Array.from(document.querySelectorAll(".available-letter"));
      for (let i = 0; i < letters.length; i += 1) {
        animateWiggle(letters[i], colors[i % 4], { delay: 50 * i });
      }
      animateShake(".user-input", "ocean", { delay: 800 });
    },
    handleKeyboardEvents(event: KeyboardEvent) {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }

      switch (event.key) {
        case "Enter":
          this.submitWord();
          break;
        case "Backspace":
          this.backspace();
          break;
        case "Del":
        case "Delete":
        case "Esc":
        case "Escape":
          this.userInput = "";
          break;
        default:
          this.addLetter(event.key);
      }
    },
  },
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  min-width: 5rem;
  height: 1.5rem;
  padding: 1rem;
  font-size: 18px;
}
</style>
