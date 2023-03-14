import { Request, Response } from "express";
import { Item } from "../models/itemModel";
import { Bidding } from "../models/biddingModel";
import { ImageDetailModel } from "../models/imageDetails";

// Adding items listed for bidding
export const addBidItems = async (req: Request, res: Response) => {
  // Extract data from request body
  const {
    itemName,
    itemDes,
    startPrice,
    startTime,
    endTime,
    bidType,
    isSold,
    address,
    cityName,
    provinceName,
    postalCode,
    imageDetails,
    userId
   } = req.body;

 // let userId = "";
  try {
    // Create item instance
    const itemDetail = await Item.create({
      itemName,
      itemDes,
      startPrice,
      userId
      });

    const bidDetail = await Bidding.create({
      startTime,
      endTime,
      bidType,
      isSold,
      address,
      cityName,
      provinceName,
      postalCode,
      userId
    })

     
     // Create an array of promises to create image details
     const imageDetailPromises = imageDetails.map((image: any) =>
     ImageDetailModel.create({
       imgDescription: image.imgDescription,
       imageName: image.imageName,
       imgUrl: image.imgUrl,
     })
   );

   // Execute the promises to create image details
   const imageDetailsResults = await Promise.all(imageDetailPromises);

    // Get the user ID
   // userId = userDetail.get().userId;
  
   // Send response with item and bid details
    res.status(201).json({
      message: {
        itemDetail: itemDetail.get({ plain: true }),
        bidDetail: bidDetail.get({ plain: true }),
       imageDetailsPlain :imageDetailsResults.map((result) =>
       result.get({ plain: true })
       )
      },
    });
  } 
  catch (err) {
    
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};

// Retrieves Item Details
const showItemDetails = (req: Request, res: Response) => {
  console.log(req);

  // Find all user details and send response
  Item.findAll({
    attributes: [
      "itemName",
      "itemDes",
      "startPrice",
      ],
  }).then((result) => {
    res.send(result);
  });
};

//Show Bid Details
const showBidDetails = (req: Request, res: Response) => {
  console.log(req);

  // Find all user details and send response
  Bidding.findAll({
    attributes: [
      "startTime",
      "endTime",
      "bidType",
      "isSold",
    ],
  }).then((result) => {
    res.send(result);
  });
};

export default {
  addBidItems,
  showBidDetails,
  showItemDetails,
  
};

