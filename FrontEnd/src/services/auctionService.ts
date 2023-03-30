import apiClient from "../axios";

export default {
  getAuctionEndTime(auction: Number) {
    return apiClient.post("api/auction/auctionEndTime", { auction });
  },

  getAuctionDetails(auction: Number | String) {
    return apiClient.post("api/auction/auctionDetails", { bidId: auction });
  },

  getItemDetails(auction: Number | string) {
    return apiClient.post("api/auction/auctionItemDetails", {
      itemId: auction,
    });
  },

  getTopFiveUser(auction: Number | string){
    return apiClient.post("api/auction/topFiveUsers",{
      auctionId:auction
    });
  },

  getNewItemDetails(requestPayload:any){
    return apiClient.post("api/auction/auctionItemDetails", requestPayload);
  },

  getImages(auction: Number) {
    return apiClient.post("api/auction/auctionImages", { itemId: auction });
  },

  getCurrentMax(auction: Number | String) {
    return apiClient.post("api/auction/highestPrice", { auctionId: auction });
  },

  getCurrentUserBid(userId: Number, auction: Number | String) {
    return apiClient.post("api/auction/myBidValue", {
      userId: userId,
      auctionId: auction,
    });
  },

  makeBlindBid(payload: any) {
    return apiClient.post("api/bid/placeBid", payload);
  },

  getAllBidDetails(){
    return apiClient.get("api/bid/fetchDetails");
  },
  getWishlist(userId: Number){
    return apiClient.get("api/wishlist/getWishlist?user_id="+userId);
  },
  postWishlist(item_id=Number, user_id=Number){
    console.log(item_id, user_id);
    return apiClient.post("api/wishlist/addWishlist?item_id="+item_id+"&user_id="+user_id);
  },

  deleteWishlist(item_id=Number, user_id=Number){
    return apiClient.delete("api/wishlist/deleteWishlist?item_id="+item_id+"&user_id="+user_id);
  },
  
  getReport(){
    return apiClient.get("api/report/getReport");
  },
  postReport(){
    return apiClient.post("api/report/addReport");
  },

};
