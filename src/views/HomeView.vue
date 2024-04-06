<template>
  <main>
    <header>Letter Clash</header>
    <router-link class="btn brutal-border" :to="{ name: 'play', query: { timer: 5 * 60 } }">Timed</router-link>
    <router-link class="btn brutal-border" :to="{ name: 'play' }">Casual</router-link>
    <div
      class="btn brutal-border pointer"
      @click="
        showCustom = true;
        customGame = new Set();
      "
    >
      Custom
    </div>
  </main>
  <native-dialog v-model="showCustom">
    <form @submit.capture.prevent="playCustom">
      <div>Chose 7 letters to play a custom game</div>
      <div class="all-letters">
        <button
          v-for="letter in alphabet"
          :key="letter"
          class="available-letter brutal-border"
          :class="{ selected: customGame.has(letter) }"
          @click.capture.prevent="toggleLetter(letter)"
        >
          {{ letter }}
        </button>
      </div>

      <div class="custom-buttons">
        <button class="btn ocean brutal-border" :disabled="customGame.size !== 7" type="submit">Play</button>
        <button class="btn white brutal-border" @click.capture.prevent="showCustom = false">Close</button>
      </div>
    </form>
  </native-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NativeDialog from "@/components/NativeDialog.vue";
import { alphabet } from "@/lib/settings";

export default defineComponent({
  components: { NativeDialog },
  data() {
    return {
      alphabet,
      showCustom: false,
      customGame: new Set() as Set<string>,
    };
  },
  methods: {
    toggleLetter(letter: string) {
      if (this.customGame.has(letter)) {
        this.customGame.delete(letter);
      } else if (this.customGame.size < 7) {
        this.customGame.add(letter);
      }
    },
    playCustom() {
      if (this.customGame.size !== 7) return;
      this.$router.push({
        name: "play",
        query: {
          game: Array.from(this.customGame).join(""),
        },
      });
    },
  },
});
</script>

<style scoped>
header {
  font-size: 2.5rem;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  padding: 2rem;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  word-spacing: 0.5em;
  letter-spacing: 0.1em;

  gap: 2rem;
}

.all-letters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  align-items: center;
  justify-content: center;
  max-width: 40rem;
}

.available-letter {
  font-size: 1.2rem;
}

dialog form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.custom-buttons {
  display: flex;
  gap: 1rem;
}

.custom-buttons .btn {
  font-size: 1rem;
}
</style>
