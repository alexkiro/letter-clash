import { createRouter, createWebHistory } from "vue-router";

import AboutView from "@/views/AboutView.vue";
import GameView from "@/views/GameView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: HomeView,
      name: "home",
      path: "/",
    },
    {
      component: AboutView,
      name: "about",
      path: "/about",
    },
    {
      component: GameView,
      name: "game",
      path: "/play",
    },
  ],
});

export default router;
