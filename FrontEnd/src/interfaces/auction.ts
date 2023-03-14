import type { IBidImageDetails } from "./seller-registration";

export interface IPostBidDetails{
  itemName: string;
  startTime: Date | string;
  endTime: Date | string;
  startPrice: string;
  provinceName: string;
  cityName: string;
  postalCode: string;
  address: string;
  itemDes: string;
  imageDetails: IBidImageDetails[];
  bidType: string;
  isSold: Number;
  startDate: Date | string;
  endDate: Date | string;
}