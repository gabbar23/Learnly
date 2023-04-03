<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="card mb-3 w-100 wid">
    <div class="card-body">
      <FormKit
        type="form"
        @submit="sellerRegister"
        enctype="multipart/form-data"
        :actions="false"
      >
        <h5 class="card-title">Bid Details</h5>
        <div class="row">
          <div class="col-md-6">
            <FormKit
              type="text"
              label="Name Of Offering"
              v-model="sellerDetails.itemName"
            />

            <FormKit
              type="number"
              label="Estimated Value"
              v-model="sellerDetails.startPrice"
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
          </div>

          <div class="col-md-6">
            <FormKit
              type="text"
              label="Address"
              v-model="sellerDetails.address"
            />
            <FormKit
              type="select"
              label="State"
              placeholder="Select a State"
              :options="states"
              v-model="sellerDetails.provinceName"
              @change="triggerChange(sellerDetails.provinceName)"
            >
            </FormKit>

            <FormKit
              type="select"
              label="City"
              placeholder="Select City"
              v-model="sellerDetails.cityName"
              :options="cityOptions"
            >
            </FormKit>

            <FormKit
              type="text"
              label="Postal Zip Code"
              help="format: a1b-c2d | a1bc2d | a1b c2d"
              v-model="sellerDetails.postalCode"
            />

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
              v-model="sellerDetails.auctionType"
            >
            </FormKit>

            <FormKit
              type="textarea"
              label="Description"
              v-model="sellerDetails.itemDes"
            />
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-primary">Submit</button>
        </div>
      </FormKit>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BidDescriptionEnum, BidTypeEnum } from "@/enums/BidTypeEnum";
import type {
  IBidImageDetails,
  IGetSellerBidDetails,
  ISelectResponse,
} from "@/interfaces/seller-registration";
import AuthService from "@/services/AuthService";
import { computed, onMounted, reactive, ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { getDate } from "@/utility";

const states = ref<ISelectResponse<string>[]>([]);
const cities = ref<ISelectResponse<string>[]>([]);
const allImages = ref<any>([]);
const bidPhotos = ref<any>({});
const { notify } = useNotification();

let cityOptions = computed(() => {
  return cities.value.map((city) => {
    return {
      label: city.label,
      value: city.value,
    };
  });
});

let sellerDetails = reactive<IGetSellerBidDetails>({
  itemName: "",
  startTime: "",
  endTime: "",
  startPrice: "",
  provinceName: "",
  cityName: "",
  postalCode: "",
  isSold: 0,
  address: "",
  itemDes: "",
  imageDetails: [],
  bidType: "",
  startDate: "",
  endDate: "",
  userId: null,
  auctionType: "",
});

const bidTypeOptions: ISelectResponse<string>[] = [
  {
    label: BidDescriptionEnum[BidTypeEnum.liveBidding],
    value: "live",
  },
  {
    label: BidDescriptionEnum[BidTypeEnum.normalBidding],
    value: "blind",
  },
  {
    label: BidDescriptionEnum[BidTypeEnum.simpleSell],
    value: "simple",
  },
];

onMounted(async () => {
  try {
    let response = await AuthService.getStates();
    states.value = [];
    for (let i = 0; i < response.data.length; i++) {
      states.value.push({
        label: response.data[i].province_name,
        value: response.data[i].province_name,
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
      imgUrl: image.data.url,
      imgName: image.data.originalname,
      imgDescription: "test",
    };
    allImages.value.push(imageDetails);
  });
  console.log(allImages.value);
};

const sellerRegister = async () => {
  sellerDetails.imageDetails = allImages.value;
  sellerDetails.startTime =
    sellerDetails.startDate + " " + sellerDetails.startTime;
  sellerDetails.endTime = sellerDetails.endDate + " " + sellerDetails.endTime;

  const details: any = localStorage.getItem("userDetails");
  const { userId } = JSON.parse(details);
  if (userId) {
    sellerDetails.userId = userId;
  } else {
    notify({
      title: "Failure!",
      text: "Unable to pull user details!",
      type: "danger",
    });
    return;
  }
  try {
    await AuthService.postBidDetails(sellerDetails);
    console.warn(sellerDetails);
    notify({
      title: "Successfull!",
      text: "Your Bid has been registered Successfully!",
      type: "success",
    });
  } catch (e) {
    notify({
      title: "Failure!",
      text: "Opps Something went wrong!",
      type: "danger",
    });
  }
};

const triggerChange = async (val: string) => {
  console.warn(val);
  cities.value = [];
  try {
    let response = await AuthService.getCities(val);
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      cities.value.push({
        label: response.data[i].city,
        value: response.data[i].city,
      });
    }
    console.warn(cities.value);
  } catch (e) {
    console.error("Error in pulling cities");
  }
};
</script>
<style scoped>
.wid {
  max-width: 900px;
}
</style>
