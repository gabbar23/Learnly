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
};
