import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/seller-registration/index.vue"),
    },
    {
      path: "/address",
      name: "address",
      component: () => import("../components/seller-registration/address/index.vue"),
    }
  ],
});

export default router;
