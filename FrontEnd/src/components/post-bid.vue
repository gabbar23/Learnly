<!-- eslint-disable vue/require-v-for-key -->
<template>
 
  <FormKit type="form" @submit="sellerRegister" enctype="multipart/form-data">
    <section class="container parent_sect">
      <FormKit
        type="text"
        label="Name Of Offering"
        v-model="sellerDetails.nameOfOffering"
      />

      <FormKit
        type="number"
        label="Estimated Value"
        v-model="sellerDetails.estimatedValue"
      />

      <FormKit
        type="date"
        label="Start Date Of Auction"
        v-model="sellerDetails.startDate"
      />

      <FormKit
        type="time"
        label="Start Time Of Auction"
        help="What time will the auction start?"
        v-model="sellerDetails.startTime"
      />

      <FormKit
        type="date"
        label="End Date Of Auction"
        v-model="sellerDetails.endDate"
      />

      <FormKit
        type="time"
        label="End Time Of Auction"
        help="What time will the auction end?"
        v-model="sellerDetails.endTime"
      />

      <FormKit
        type="select"
        label="State"
        placeholder="Select a State"
        :options="states"
        v-model="sellerDetails.province"
        @change="triggerChange(sellerDetails.province)"
      >
      </FormKit>

      <FormKit
        type="select"
        label="City"
        placeholder="Select City"
        :options="cities"
        v-model="sellerDetails.city"
      />

      <FormKit
        type="text"
        label="Postal Zip Code"
        help="format: a1b-c2d | a1bc2d | a1b c2d"
        v-model="sellerDetails.postalCode"
      />

      <FormKit type="text" label="Address" v-model="sellerDetails.address" />

      <FormKit
        name="bidPhotos"
        type="file"
        label="Photo of Items"
        accept=".jpg,.jpeg,.png"
        help="Only .pdf,.jpg,.jpeg,.png files allowed"
        multiple="true"
        v-model="bidPhotos"
        @blur="uploadImages(bidPhotos)"
      />

      <FormKit
        type="select"
        label="Bid Type"
        placeholder="Post Bid as"
        :options="bidTypeOptions"
        v-model="sellerDetails.bidType"
      >
      </FormKit>

      <FormKit
        type="textarea"
        label="Description"
        v-model="sellerDetails.description"
      />
    </section>
  </FormKit>

</template>
<script lang="ts" setup>
import { BidDescriptionEnum, BidTypeEnum } from "@/enums/BidTypeEnum";
import type {
  IBidImageDetails,
  IGetSellerBidDetails,
  ISelectResponse,
} from "@/interfaces/seller-registration";
import AuthService from "@/services/AuthService";
import { onMounted, reactive, ref } from "vue";
const states = ref<ISelectResponse<string>[]>([]);
const cities = ref<ISelectResponse<string>[]>([]);
const allImages = ref<any>([]);
const bidPhotos = ref<any>({});
let sellerDetails = reactive<IGetSellerBidDetails>({
  nameOfOffering: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  estimatedValue: "",
  province: "",
  city: "",
  postalCode: "",
  address: "",
  description: "",
  imageDetails: [],
  bidType: BidTypeEnum.liveBidding,
});
const bidTypeOptions: ISelectResponse<BidTypeEnum>[] = [
  {
    label: BidDescriptionEnum[BidTypeEnum.liveBidding],
    value: BidTypeEnum.liveBidding,
  },
  {
    label: BidDescriptionEnum[BidTypeEnum.normalBidding],
    value: BidTypeEnum.normalBidding,
  },{
    label: BidDescriptionEnum[BidTypeEnum.simpleSell],
    value: BidTypeEnum.simpleSell,
  },
];

onMounted(async () => {
  try {
    let response = await AuthService.getStates();
    states.value = [];
    for (let i = 0; i < response.data.length; i++) {
      states.value.push({
        label: response.data[i].province,
        value: response.data[i].province,
      });
    }
    console.warn(states.value);
  } catch (e) {
    console.error("Error in fetching states", e);
  }
});

const uploadImages = async (data: any) => {
  const headerConfig = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  console.log(data);
  // if(data.length > 3){
  //   console.log("Only 3 Images are allowed");
  //   return;
  // }
  data.forEach(async (fileItem: any) => {
    const body = new FormData();
    console.warn(fileItem);
    body.append("image", fileItem.file);
    const image = await AuthService.uploadImage(body, headerConfig);
    console.warn(image);
    const imageDetails: IBidImageDetails = {
      imageUrl: image.data.url,
      imageName: image.data.originalname,
    };
    allImages.value.push(imageDetails);
  });
  console.log(allImages.value);
};

const sellerRegister = async () => {
  console.warn(allImages.value);
  sellerDetails.imageDetails = allImages.value;
  console.warn(sellerDetails);
};

const triggerChange = async (val: string) => {
  console.warn(val);
  cities.value = [];
  try {
    let response = await AuthService.getCities();
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      cities.value.push({
        label: response.data[i].cities,
        value: response.data[i].cities,
      });
    }
    console.warn(cities.value);
  } catch (e) {
    console.error("Error in pulling cities");
  }
};
</script>
<style>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

</style>
