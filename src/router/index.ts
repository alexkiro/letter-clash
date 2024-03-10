import { createRouter, createWebHistory } from "vue-router";

import AboutView from "@/views/AboutView.vue";
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
  ],
});

export default router;
