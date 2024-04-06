import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import GameView from "@/views/GameView.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/play", name: "play", component: GameView },
    {
      path: "/play/:timer",
      name: "play-timer",
      component: GameView,
      props: (route) => ({ timer: Number(route.params.timer) }),
    },
  ],
});
