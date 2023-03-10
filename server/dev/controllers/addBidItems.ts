import { Request, Response } from "express";
import { Item } from "../models/itemModel";
import { Bidding } from "../models/biddingModel";

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
   } = req.body;

 // let userId = "";
  try {
    // Create item instance
    const itemDetail = await Item.create({
      itemName,
      itemDes,
      startPrice,
      });

    const bidDetail = await Bidding.create({
      startTime,
      endTime,
      bidType,
      isSold,
    })

    // Get the user ID
   // userId = userDetail.get().userId;
  
   // Send response with item and bid details
    res.status(201).json({
      message: {
        itemDetail: itemDetail.get({ plain: true }),
        bidDetail: bidDetail.get({ plain: true }),
      },
    });
  } 
  catch (err) {
    // If there is an error, delete the item detail instance and send an error response
    // Item.destroy({
    //   where: {
    //     userId,
    //   },
    // });

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

// const addBidItems = async (req, res) => {
//     const itemName = req.body.itemName;
//     const itemDes = req.body.itemDes;
//     const startPrice = req.body.startPrice;
//     const startTime = req.body.startTime;
//     const endTime = req.body.endTime;
//     const bidType = req.body.bidType;
//     const isSold = req.body.isSold;
//     try {
//         const itemDetail = await bidItemModel.Item.create({
//             itemName: itemName,
//             itemDes: itemDes,
//             startPrice: startPrice,
//         });

//         const bidDetails = await bidDetailModel.Bidding.create({
//             startTime: startTime,
//             endTime: endTime,
//             bidType :bidType,
//             isSold: isSold,
        
//         });

//        // const userId = userDetail.get().userId;
    
//     res.status(201).json({
//         message: {
//             itemDetail: itemDetail.get({ plain: true }),
//             bidDetails: bidDetails.get({ plain: true }),
//         },
//     });
// }
// catch (err) {
//     res.status(500).json({
//         message: err,
//     });
// }
// };
// exports.addBidItems = addBidItems;
// const showValues = (req, res) => {
// console.log(req);
// bidItemModel.Item.findAll({
//     attributes: [
//         "itemId",
//         "itemName",
//         "itemDes",
//         "startDate",
//     ],
//     }).then((result) => {
//         res.send(result);
//     });
//     };
// exports.default = {
//     addBidItems: exports.addBidItems,
//     showValues,
// }
