<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style>
@import "reset-css/reset.css";
@import "@/assets/main.css";

dialog[open] {
  background-color: white;
  min-height: 40%;
  min-width: 90%;

  max-height: 80%;
  max-width: 90%;
  margin: auto;

  display: flex;
  flex-direction: column;

  overflow: auto;
  line-height: 1.1;
}

dialog::backdrop {
  background-color: rgba(10, 10, 10, 0.8);
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
  outline: none;
}

.available-letter:hover {
  background-color: var(--peach);
}

.available-letter.selected,
.available-letter:disabled {
  background-color: var(--ocean);
  color: white;
}
</style>
