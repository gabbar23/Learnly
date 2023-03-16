import type { BidTypeEnum } from "./../enums/BidTypeEnum";

export interface IGetState {
  state: string;
}

export interface ISelectResponse<T> {
  label: string;
  value: T;
}

export interface IGetStateDetails {
  province: string;
}

export interface IGetAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

export interface IGetUserDetails {
  firstName: string,
  lastName: string,
  dateOfBirth: Date|string,
  gender: string,
  isBuyer:boolean;
  isSeller:boolean;
  phone: string;
  email: string;

  address: string;
  cityName: string;
  password: string;
  postalCode: string;

  provinceName: string;
  govtIdUrl?: string;

  termsCondition: boolean;
}

export interface IGetSellerBidDetails {
  nameOfOffering: string;
  startDate: Date | string;
  startTime: Date | string;
  endDate: Date | string;
  endTime: Date | string;
  estimatedValue: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  description: string;
  imageDetails: IBidImageDetails[];
  bidType: BidTypeEnum;
}

export interface IBidImageDetails {
  imageName: string;
  imageUrl: string;
}
