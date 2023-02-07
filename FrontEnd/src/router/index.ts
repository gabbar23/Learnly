import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/seller-registration/index.vue"),
    },
    // {
    //   path: "/address",
    //   name: "address",
    //   component: () => import("../components/seller-registration/address/index.vue"),
    // },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/seller-registration/login.vue"),
    },
    {
      path: "/homepage",
      name: "homepage",
      component: () => import("../components/seller-registration/homepage.vue"),
    },
  ],
});

export default router;
