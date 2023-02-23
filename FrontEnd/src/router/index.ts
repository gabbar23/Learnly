import { BuyerDetails, DonationDetails, OrderDetails, ReportIssue } from "@/components/component";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/registration/seller-registration.vue"),
    },
    {
      path: "/buyer-details",
      name: "buyer details",
      component: () => import("../components/registration/buyer-details.vue"),
    },
    {
      path: "/",
      name: "buyer",
      component: () => import("../components/registration/buyer-registration.vue"),
      children:[
        { path: '/buyer', component: BuyerDetails },
        { path: '/donations', component: DonationDetails },
        { path: '/orders', component: OrderDetails },
        { path: '/report-issue', component: ReportIssue },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/login/user-login.vue"),
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
      component: () => import("../components/auction/online-bidding.vue"),
    },
    {
      path: "/sell-item",// I dont think so its needed anymore
      name: "Sell Item",
      component: () => import("../components/auction/sell-item-landing.vue"),
    },
    {
      path: "/homepage",
      name: "Homepage",
      component: () => import("../components/homepage.vue"),
    },
    {
      path: "/make-blind-auction",
      name: "Blind Auction",
      component: () => import("../components/auction/blind-auction.vue"),
    },
    {
      path: "/make-sell",
      name: "Simply Sell",
      component: () => import("../components/auction/simple-sell.vue"),
    },
  ],
});

export default router;
