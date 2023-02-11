import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/seller-registration.vue"),
    },
    {
      path: "/buyer",
      name: "buyer",
      component: () => import("../components/buyer-registration.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/login.vue"),
    },
    {
      path: "/homepage",
      name: "homepage",
      component: () => import("../components/homepage.vue"),
    },
  ],
});

export default router;
