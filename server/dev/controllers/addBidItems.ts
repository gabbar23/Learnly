import { Request, Response } from "express";
import { Item } from "../models/itemModel";
import { Auction } from "../models/aunctionModel";
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
    auctionType,
    isSold,
    address,
    cityName,
    provinceName,
    postalCode,
    imageDetails,
    user_id
    //userId
   } = req.body;
  
  try {

  //Create a instance of auction
  const auctionDetail = await Auction.create({
    startTime,
    endTime,
    auctionType,
    address,
    cityName,
    provinceName,
    postalCode,
    user_id
  }, {
    returning: ['auctionId'] // To return the inserted itemId
  })
  //Storing auction id returned after creating auction details
  const auctionId = auctionDetail.getDataValue('auctionId'); 
   
    // Create item instance
    const itemDetail = await Item.create({
      itemName,
      itemDes,
      isSold,
      user_id,
      startPrice,
      auctionId
      }, {
        returning: ['itemId'] // To return the inserted item_id
      });
      
       //Storing item id returned after creating item details
      const itemId = itemDetail.getDataValue('itemId'); // Access the returned item_id value
      
      const userIds = localStorage.getItem("userId");
      console.log(userIds);
      // Create an array of promises to create image details
     const imageDetailPromises = imageDetails.map((image: any) =>
      ImageDetailModel.create({
        imgDescription: image.imgDescription,
        imgName: image.imgName,
        imgUrl: image.imgUrl,
        itemId : itemId
      })
  );
     
   // Execute the promises to create image details
   const imageDetailsResults = await Promise.all(imageDetailPromises);

   // Send response with item and bid details
    res.status(201).json({
      message: {
        itemDetail: itemDetail.get({ plain: true }),
        auctionDetail: auctionDetail.get({ plain: true }),
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
    attributes: ["itemName", "itemDes", "startPrice"],
  }).then((result) => {
    res.send(result);
  });
};

//show Bid Details
const showAuctionDetails = (req: Request, res: Response) => {
  console.log(req);

  // Find all user details and send response
  Auction.findAll({
    attributes: ["startTime", "endTime", "bidType", "isSold"],
  }).then((result) => {
    res.send(result);
  });
};

export default {
  addBidItems,
  showAuctionDetails,
  showItemDetails,
  
};
