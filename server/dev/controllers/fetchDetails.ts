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
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    const auctionDetails = results.reduce((acc: any, auction: any) => {
      const auctionId = auction.auctionId;
      const itemId = auction.itemId;

      if (acc[auctionId]) {
        const item = acc[auctionId].items[itemId];
        item.imageDetails.push({
          imgId: auction.imgId,
          imgUrl: auction.imgUrl,
          imgDescription: auction.imgDescription,
          imgName: auction.imgName,
        });
      } else {
        const auctionObj: any = {};
        auctionObj.auctionId = auction.auctionId;
        auctionObj.auctionType = auction.auctionType;
        auctionObj.items = {};
        auctionObj.items[itemId] = {
          itemId: auction.itemId,
          itemName: auction.itemName,
          imageDetails: [
            {
              imgId: auction.imgId,
              imgUrl: auction.imgUrl,
              imgDescription: auction.imgDescription,
              imgName: auction.imgName,
            },
          ],
        };
        acc[auctionId] = auctionObj;
      }

      return acc;
    }, {});

    const auctionDetailsArray = Object.values(auctionDetails);

    res.json(auctionDetailsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching details" });
  }
};

export default {
  fetchDetails,
};
