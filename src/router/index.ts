import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: HomeView,
      name: "home",
      path: "/",
    },
    {
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      path: "/about",
    },
  ],
});

export default router;
