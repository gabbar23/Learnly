export interface IGetState {
  state: string;
}

export interface ISelectResponse {
  label: string;
  value: string;
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
  fname: string;
  lname: string;
  email: string;
  phone: string;
  nameOfOffering: string;
  estimatedValue: number | null;
  photoId: string;
  description: string;
  termsCondition: boolean;
  address: string;
  password: string;
  city: string;
  province: string;
  postalCode: string;
  dateOfbirth: Date;
  age: number | null;
  photoDetail?: Blob | FormData;
}
