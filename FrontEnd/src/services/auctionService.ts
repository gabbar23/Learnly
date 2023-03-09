import type {
    IGetState,
    IGetUserDetails,
  } from "@/interfaces/seller-registration";
  import apiClient from "../axios";
  
  export default {
    pushBid() {
      return apiClient.post("/auction/pushBid/");
    },

  };
  