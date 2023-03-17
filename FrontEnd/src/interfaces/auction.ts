import type { IBidImageDetails } from "./seller-registration";

export interface IPostBidDetails {
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

export interface itemImageDetails {
  imgDescription: string;
  imgId: Number;
  imgName: string;
  imgUrl: string;
  itemId?: Number;
}

export interface IGetAuctionItemDetails {
  imageDetails: itemImageDetails[];
  createdAt: string;
  isSold: boolean;
  itemDes: string;
  itemId: Number;
  itemName: string;
  startPrice: Number;
  updatedAt: string;
  user_id: Number;
  bidAmount?: Number | null;
}
export interface IGetAuctionItemsDetails {
  itemID: number;
  itemName: string;
  itemDes: string;
  startPrice: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  user_id: null;
}
export interface IGetAuctionDetails {
  address: string;
  auctionID: number;
  auctionType: string;
  cityName: string;
  createdAt: Date | string;
  endTime: Date | string;
  isSold: boolean;
  postalCode: string;
  provinceName: string;
  startTime: Date | string;
  updatedAt: Date | string;
  user_id: null;
}

export interface IBlindAuctionQueryPayload {
  itemId: string | null;
  auctionId: string | null;
}

export interface IGeneralAuctionDetails {
  imageDetails: itemImageDetails[];
  auctionId: number | null;
  auctionType: string;
  itemId: Number | null;
  itemName: string;
}
