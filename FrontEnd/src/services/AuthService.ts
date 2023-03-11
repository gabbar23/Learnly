import type { ILoginDetails } from "@/interfaces/bid-for-good";
import type {
  IGetState,
  IGetUserDetails,
} from "@/interfaces/seller-registration";
import apiClient from "../axios";

export default {
  register(credentials: IGetUserDetails) {
    return apiClient.post("api/v1/register/registerUser", credentials);
  },
  getStates() {
    return apiClient.get("api/fetch/fetchStates");
  },
  getCities() {
    return apiClient.get("api/fetch/fetchCity");
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

  checkLogin(loginDetails: ILoginDetails){
    return apiClient.post("api/v1/register/checkLoginCredentials",loginDetails).then((res)=>{
      console.log(res);
    });
  }
};
