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
      path: "/interim-homepage",
      name: "Interim-Homepage",
      component: () => import("../components/intermediate-homepage.vue"),
    },
    {
      path: "/admin-dashboard",
      name: "Admin Dashboard",
      component: () => import("../components/admin-dashboard.vue"),
    },
    {
      path: "/make-bid",
      name: "Make Bidding",
      component: () => import("../components/online-bidding.vue"),
    },
    {
      path: "/sell-item",
      name: "Sell Item",
      component: () => import("../components/sell-item-landing.vue"),
    },
    {
      path: "/homepage",
      name: "Homepage",
      component: () => import("../components/homepage.vue"),
    },
  ],
});

export default router;
