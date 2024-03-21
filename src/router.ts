import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import GameView from "@/views/GameView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/play", name: "play", component: GameView },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
