import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { sequelize } from "../util/database";

export const fetchDetails = async (_: Request, res: Response) => {
  try {
    const results = await sequelize.query(
      `
      SELECT auctions.*, items.*, imageDetails.*
      FROM auctions
      INNER JOIN items ON items.auctionId = auctions.auctionId
      INNER JOIN imageDetails ON imageDetails.itemId = items.itemId
      WHERE auctions.isSold = false;
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    const auctionDetails = results.reduce((acc: any, auction: any) => {
      const auctionId = auction.auctionId;
      const itemId = auction.itemId;
    
      // Check if auction already exists in the accumulator
      let auctionObj = acc[auctionId];
    
      if (!auctionObj) {
        // If not, create a new auction object and add it to the accumulator
        auctionObj = {
          auctionId: auctionId,
          auctionType: auction.auctionType,
          items: {},
        };
        acc[auctionId] = auctionObj;
      }
    
      // Check if item already exists in the auction object
      let itemObj = auctionObj.items[itemId];
    
      if (!itemObj) {
        // If not, create a new item object and add it to the auction object
        itemObj = {
          itemId: itemId,
          itemName: auction.itemName,
          imageDetails: [],
        };
        auctionObj.items[itemId] = itemObj;
      }
    
      // Push the image details to the item object
      itemObj.imageDetails.push({
        imgId: auction.imgId,
        imgUrl: auction.imgUrl,
        imgDescription: auction.imgDescription,
        imgName: auction.imgName,
      });
    
      return acc;
    }, {});
    
    // Combine auctionDetails and itemDetails into one object
    const combinedDetails = Object.keys(auctionDetails).map((auctionId: string) => {
      const auctionObj = auctionDetails[auctionId];
      const itemsArray = Object.values(auctionObj.items);
      return {
        ...auctionObj,
        items: itemsArray,
      };
    });
    
    // Send the combined details as a JSON response
    res.json({ details: combinedDetails });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching details" });
  }
};

export default {
  fetchDetails,
};
