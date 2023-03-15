import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { sequelize } from "../util/database";
// import { Auction } from "../models/aunctionModel";
// import { ImageDetailModel } from "../models/imageDetails";
// import { Item } from "../models/itemModel";

export const fetchDetails = async (_: Request, res: Response) => {
 
  try {
    // Fetch all auctions and  include associated items
   const results = await sequelize.query( 
      `SELECT auctions.*, itemDetails.*
      FROM auctions
      INNER JOIN (
        SELECT items.itemId AS itemItemId, items.auctionId, items.itemName, imageDetails.imgUrl, imageDetails.imgName
        FROM items
        INNER JOIN imageDetails
        ON items.itemId = imageDetails.itemId
      ) AS itemDetails
      ON auctions.auctionId = itemDetails.auctionId
      ;
      `,
      {
        // replacements: { buyerId: buyerId },
        type: QueryTypes.SELECT,
      }
    );

    // Return the order details as JSON
    res.json(results);
  //   const results = await Auction.findAll({
  //     include: [
  //       {
  //         model: Item,
  //         attributes: ["itemId", "itemName"],
  //         include: [{
  //           model: ImageDetailModel,
  //           attributes: ["imgId", "imgUrl", "imgDescription", "imgName"],
  //         }] 
  //       },
  //     ],
  //   });
    
  //   // Transform the result into the desired format
  //   const auctionDetails = results.map((auction) => ({
  //     auctionId: auction.getDataValue("auctionId"),
  //     auctionType: auction.getDataValue("auctionType"),
  //     itemsDetails: auction.getDataValue("items").map((item: { getDataValue: (arg0: string) => any; }) => ({
  //       itemId: item.getDataValue("itemId"),
  //       itemName: item.getDataValue("itemName"),
  //       imageDetails: item.getDataValue("imageDetail"),
  //     })),
  //   }));
    
  //   // Return the transformed result as JSON
  //   res.json(auctionDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching orders" });
  }
};

export default {
  fetchDetails
};
