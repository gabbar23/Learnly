
import apiClient from "../axios";

  export default {

    getAuctionEndTime(auction:number) {
      return apiClient.post("api/auction/endTime",{auction});
    },

    getAuctionDetails(auction:number){
      return apiClient.post("api/auction/auctionDetails",{auction});
    }

  };
  