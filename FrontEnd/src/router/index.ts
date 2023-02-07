import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/index.vue"),
    },
    // {
    //   path: "/address",
    //   name: "address",
    //   component: () => import("../components/address/index.vue"),
    // },
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
