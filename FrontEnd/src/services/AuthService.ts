import type { IApproveOrDeclineReqPayload } from "@/interfaces/admin";
import type { ILoginDetails } from "@/interfaces/bid-for-good";
import type {
  IGetState,
  IGetUserDetails,
} from "@/interfaces/seller-registration";
import router from "@/router";
import apiClient from "../axios";

export default {
  register(credentials: IGetUserDetails) {
    return apiClient.post("api/v1/register/registerUser", credentials);
  },
  getStates() {
    return apiClient.get("api/fetch/fetchStates");
  },
  getCities(province:any) {
    console.log(province)
    return apiClient.get("api/fetch/fetchCity?province=" + province);
  },

  checkUserExist(email: string) {
    return apiClient.post("api/v1/register/is-user-present", { email });
  },

  uploadImage(formData: any, config: any) {
    return apiClient.post("api/fetch/single-upload", formData, config);
  },

  getUploadImage() {
    return apiClient.get("api/fetch/upload");
  },

  checkLogin(loginDetails: ILoginDetails) {
    return apiClient.post("api/v1/register/checkLoginCredentials", loginDetails);
  },

  verifiedSellers() {
    return apiClient.get("api/v1/register/verifiedSellers");
  },

  approveOrDeclineSeller(payload: IApproveOrDeclineReqPayload) {
    return apiClient.put("api/v1/register/markAsVerified", { query: payload });
  },
 
  getBidDetails(){
  return apiClient.get("/api/bid/fetchBidDetails");
  },
  
  getBidItems(){
  return apiClient.get("/api/bid/fetchBidItems");
  },
  
  getImageDetails(){
    return apiClient.get("/api/bid/fetchImageDetails");
  },
  getUploadedImage(){
    return apiClient.get("/api/")
  }
};
