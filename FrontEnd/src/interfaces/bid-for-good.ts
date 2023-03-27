export interface ILoginDetails {
  email: string;
  password: string;
}

export interface ILoggedInUserDetails {
  email: string;
  isBuyer: boolean;
  isSeller: boolean;
  isVerified: boolean;
  sessionId: string;
  userId: Number;
}

export interface ILogOutRequestPayload{
  sessionId: string;
}
