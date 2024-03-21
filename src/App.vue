<template>
  <router-view />
</template>

<script setup lang="ts"></script>

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

main {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2rem;
}
</style>
