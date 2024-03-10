<script setup lang="ts"></script>

<template>
  <header>
    <div>Letter Clash</div>
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style>
@import "reset-css/reset.css";
@import "@/assets/main.css";
</style>
