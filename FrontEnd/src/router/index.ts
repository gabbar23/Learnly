import {
  BuyerDetails,
  DonationDetails,
  OrderDetails,
  ReportIssue,
} from "@/components/component";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../components/login/user-login.vue"),
    },
/*    {
      path: "/buyer-details",
      name: "buyer details",
      component: () => import("../components/registration/buyer-details.vue"), 
    }, */
    {
      path: "/buyer",
      name: "buyer",
      component: () =>
        import("../components/registration/buyer-registration.vue"),
      children: [
       /* { path: "", name: "Buyer Details", component: BuyerDetails }, */
        { path: "/donations", component: DonationDetails },
        { path: "/buyer/orders", component: OrderDetails },
        { path: "/buyer/report-issue", component: ReportIssue },
      ],
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../components/homepage-new.vue"),
    },
    {
      path: "/interim-home",
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
      path: "/sell-item", // I dont think so its needed anymore
      name: "Sell Item",
      component: () => import("../components/auction/sell-item-landing.vue"),
    },
    {
      path: "/homepage",
      name: "Homepage",
      component: () => import("../components/homepage-new.vue"),
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
    {
      path: "/reg-buyer",
      name: "Buyer Registration",
      component: () => import("../components/registration/buyer-details.vue"),
    },
    {
      path: "/reg-seller",
      name: "Seller Registration",
      component: () =>
        import("../components/registration/seller-registration.vue"),
    },
    {
      path: "/post-bid",
      name: "Post Bid",
      component: () => import("../components/post-bid.vue"),
    },
  ],
});

export default router;
