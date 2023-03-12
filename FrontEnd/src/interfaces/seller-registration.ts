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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nameOfOffering: string;
  estimatedValue: number | null;
  photoId: string;
  description: string;
  termsCondition: boolean;
  address: string;
  password: string;
  cityName: string;
  provinceName: string;
  postalCode: string;
  dateOfBirth: Date;
  gender: string;
  isBuyer:boolean;
  isSeller:boolean;
  isVerified:boolean;
  age: number | null;
  photoDetail?: Blob | FormData;
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
