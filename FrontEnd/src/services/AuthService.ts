import type { IGetState } from "@/interfaces/seller-registration";
import apiClient from "../axios";

export default {
  register(credentials: object) {
    return apiClient.post("api/register/createSeller", credentials);
  },
  getStates() {
    return apiClient.get("api/fetch/fetchStates");
  },
  //add parameter state name to search city
  getCities(state: IGetState) {
    return apiClient.get("api/fetch/fetchCity", state);
  },
};

