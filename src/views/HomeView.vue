<template>
  <main>
    <header>Letter Clash</header>
    <router-link class="btn brutal-border" :to="{ name: 'play-timer', params: { timer: 5 * 60 } }">
      New Game
    </router-link>
    <router-link class="btn brutal-border" :to="{ name: 'play' }">Casual Game</router-link>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
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
</style>
