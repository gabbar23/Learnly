export interface IGetAuctionItemsDetails {
    itemID:number,
    itemName: string,
    itemDes: string,
    startPrice: number,
    createdAt: Date|string,
    updatedAt: Date|string,
    user_id: null,
  }
  export interface IGetAuctionDetails {
    address: string;
    bidId: number;
    bidType: string;
    cityName: string;
    createdAt: Date|string;
    endTime: Date|string;
    isSold: boolean
    postalCode: string
    provinceName: string
    startTime: Date|string;
    updatedAt: Date|string;
    user_id: null
  }