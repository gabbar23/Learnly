import apiClient from "../axios";

export default {
  getAuctionEndTime(auction: Number) {
    return apiClient.post("api/auction/auctionEndTime", { auction });
  },

  getAuctionDetails(auction: Number) {
    return apiClient.post("api/auction/auctionDetails", { bidId: auction });
  },

  getItemDetails(auction: Number) {
    return apiClient.post("api/auction/auctionItemDetails", {
      itemId: auction,
    });
  },

  getImages(auction: Number) {
    return apiClient.post("api/auction/auctionImages", { itemId: auction });
  },

  getCurrentMax(auction:Number){
    return apiClient.post("api/auction/highestPrice",{auctionId:auction});
  },

  getCurrentUserBid(userId:Number,auction:Number){
    return apiClient.post("api/auction/myBidValue",{userId:userId,auctionId:auction});
  }
  
};
