
import apiClient from "../axios";

  export default {

    getAuctionEndTime(auction:Number) {
      return apiClient.post("api/auction/auctionEndTime",{auction});
    },

    getAuctionDetails(auction:Number){
      return apiClient.post("api/auction/auctionDetails",{auction});
    },

    getItemDetails(){
      return apiClient.get("api/bid/fetchBidDetails");
    },

    getBidItem(){
      return apiClient.get("api/bid/fetchBidItems");
    }
  };
  