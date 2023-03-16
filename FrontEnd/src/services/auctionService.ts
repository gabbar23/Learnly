import apiClient from "../axios";

export default {
  getAuctionEndTime(auction: Number) {
    return apiClient.post("api/auction/auctionEndTime", { auction });
  },

  getAuctionDetails(auction: Number) {
    return apiClient.post("api/auction/auctionDetails", { bidId: auction });
  },

  getItemDetails(auction: Number | string) {
    return apiClient.post("api/auction/auctionItemDetails", {
      itemId: auction,
    });
  },

  getNewItemDetails(requestPayload:any){
    return apiClient.post("api/auction/auctionItemDetails", requestPayload);
  },

  getImages(auction: Number) {
    return apiClient.post("api/auction/auctionImages", { itemId: auction });
  },

  getCurrentMax(auction: Number) {
    return apiClient.post("api/auction/highestPrice", { auctionId: auction });
  },

  getCurrentUserBid(userId: Number, auction: Number) {
    return apiClient.post("api/auction/myBidValue", {
      userId: userId,
      auctionId: auction,
    });
  },

  makeBlindBid(payload: any) {
    return apiClient.post("api/bid/placeBid", payload);
  },
};
