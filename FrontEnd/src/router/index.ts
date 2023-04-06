import {
  BuyerDetails,
  DonationDetails,
  OrderDetails,
  ReportIssue,
  IssueTrack,
} from "@/components/component";
import store from "@/store";
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
        { path: "", name: "Buyer Details", component: BuyerDetails },
        // { path: "/donations", component: DonationDetails },
        { name:"buyer-order", path: "/buyer/orders", component: OrderDetails },
        { name:"buyer-report-issue", path: "/buyer/report-issue", component: ReportIssue },
        { name:"buyer-issue-history", path: "/buyer/issues",component: IssueTrack },
      ],
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../components/homepage-latest.vue"),
    },
    // {
    //   path: "/interim-home",
    //   name: "Interim-Homepage",
    //   component: () => import("../components/intermediate-homepage.vue"),
    // },
    {
      path: "/admin-dashboard",
      name: "Admin Dashboard",
      component: () => import("../components/admin-dashboard.vue"),
    },
    {
      path: "/admin-issue-details",
      name: "Admin Issues",
      component: () => import("../../src/components/admin-issue-details.vue"),
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
    // {
    //   path: "/homepage",
    //   name: "Homepage",
    //   component: () => import("../components/homepage-new.vue"),
    // },
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
    // {
    //   path: "/reg-buyer",
    //   name: "Buyer Registration",
    //   component: () => import("../components/registration/buyer-details.vue"),
    // },
    {
      path: "/reg-seller",
      name: "User Registration",
      component: () =>
        import("../components/registration/seller-registration.vue"),
    },
    {
      path: "/post-bid",
      name: "Post Bid",
      component: () => import("../components/post-bid.vue"),
    },
    {
      path: "/add-card",
      name: "Add Card",
      component: () => import("../components/card-details.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      name: "Error",
      component: () => import("../components/misc pages/not-found.vue"),
    },
    {
      path:"/No-access",
      name:"No Access",
      component: () => import("../components/misc pages/not-found.vue"),
    },

    {
      path: "/congratulations",
      name: "congratulations",
      component: () => import("../components/misc pages/congratulations.vue"),
    },
    {
      path: "/nav-bar",
      name: "nav",
      component: () => import("../components/navigation-bar.vue"),
    },
    {
      path: "/filter",
      name: "auctionFilter",
      component: () => import("../components/auction-filter.vue"),
    },
    {
        path: "/wishlist",
        name: "wishlist",
        component: () => import("../components/misc pages/wishlist.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userDetailsObject: any = localStorage.getItem("userDetails");
  const userDetail = JSON.parse(userDetailsObject);
  console.log(userDetail)
  const isLoggedIn = !!(userDetail && userDetail.sessionId);
  //const isAdmin= !!(userDetail && userDetail.isAdmin);
  const isSeller= !!(userDetail && userDetail.isSeller);
 // const isVerified= !!(userDetail && userDetail.isVerified);
  const isBuyer= !!(userDetail && userDetail.isBuyer);
  const adminID= !! (userDetail && userDetail.userId==34);
  if (isLoggedIn) {
    //console.log(userDetail)
    store.commit("setSessionId", userDetail.sessionId);
  }
  store.commit("setCurrentRoute", to);
  console.log(to);
  
  if(adminID){
    next();
  }
  else if (to.name !== "Login" && to.name !== "User Registration" && !isLoggedIn) {
    next({ name: "Login" });
  }
  else if(isLoggedIn){
    if (!adminID && to.name === "Admin Dashboard" || to.name === "Admin Issues") {
      next({ name: "No Access" });
    }
    else if(!isSeller && to.name==="Post Bid"){
      next({ name: "No Access" });
    }
    else if(!isBuyer && (to.name==="wishlist" || to.name==="buyer-order" || to.name ==="buyer-report-issue" || to.name ==="buyer-issue-history")){
      next({ name: "No Access" });
    }
    else{
      next();
    }
  }
  else {
    next();
  }
});

export default router;
