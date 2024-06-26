import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import GameView from "@/views/GameView.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/play",
      name: "play",
      component: GameView,
      props: (route) => ({ ...route.query, timer: Number(route.query.timer) }),
    },
  ],
});
