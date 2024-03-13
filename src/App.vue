<script setup lang="ts">
import { type Ref, ref } from "vue";

import GamePlay from "@/components/GamePlay.vue";

const enum GameModes {
  notSet,
  singlePlayer,
  // manualInput,
  // multiPlayer,
}

const selectedGameMode: Ref<GameModes> = ref(GameModes.singlePlayer);
</script>

<template>
  <template v-if="selectedGameMode === GameModes.notSet">
    <header>Letter Clash</header>
    <button @click="selectedGameMode = GameModes.singlePlayer" class="btn brutal-border">Start Game</button>
  </template>
  <game-play v-else-if="selectedGameMode === GameModes.singlePlayer" />
</template>

<style>
@import "reset-css/reset.css";
@import "@/assets/main.css";

header {
  font-size: 2.5rem;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  padding: 2rem;
}

.btn {
  display: flex;

  color: var(--btn-primary-fg);
  background-color: var(--btn-primary-bg);

  padding: 1rem 2.5rem;

  font-size: 1.5rem;
}
</style>
