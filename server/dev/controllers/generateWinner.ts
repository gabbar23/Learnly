import { Request, Response } from "express";

import { Auction } from "../models/aunctionModel";
import { userBidDetailsModel } from "../models/userBidDetails";
import { Item } from "../models/itemModel";
import { sequelize } from "../util/database";
import { DataTypes, QueryTypes } from "sequelize";

const Winner = sequelize.define('winner', {
    
     firstname:{
        field: 'firstname',
        type: DataTypes.STRING
     },
     lastName:{
        field: 'lastname',
        type: DataTypes.STRING
     },
     userId:
     {
        field : 'userId',
        type: DataTypes.INTEGER
     },
     bidAmount:{
        field: 'bidAmount',
        type: DataTypes.INTEGER
     }

  })
const generateWinner = async (req: Request, res: Response) => {
  const auctionId = req.body.auctionId;

  try {
    // Find the auction with the given ID
    const auction = await Auction.findOne({ where: { auctionId } });

    if (!auction) {
      throw new Error(`Auction with ID ${auctionId} not found`);
    }
    const results = await sequelize.query(
      `
      SELECT u.firstName, u.lastName, l.email
      FROM UserDetails u
      INNER JOIN (
        SELECT userId, userBidId, MAX(bidAmount) AS maxBid
        FROM userBidDetails
        WHERE auctionId = 1
        GROUP BY userId
      ) b ON u.userId = b.userId
      INNER JOIN items i ON i.auctionId = 1
      INNER JOIN loginDetails l ON l.user_id = u.userId 
      WHERE b.maxBid = (SELECT MAX(bidAmount) FROM userBidDetails WHERE auctionId = 1)
      AND b.maxBid > i.startPrice;
      `,
      {
        type: QueryTypes.SELECT,
        replacements: { auctionId: auctionId },
        mapToModel: true,
        model: Winner

      }
    );
    
    const winners = results.map(result => ({
        firstName: result.getDataValue('firstName'),
        lastName: result.getDataValue('lastName'),
        userId: result.getDataValue('userId'),
        bidAmount : result.getDataValue('maxBid')
      }));
      
    //console.log(winners);

    const firstname=  winners[0].firstName;
    const lastName=  winners[0].lastName;
    const bidAmount = winners[0].bidAmount;
    const userId = winners[0].userId;

    console.log(firstname,lastName)
    
    const Id = await userBidDetailsModel.findAll({
        where: {
          bidAmount: bidAmount, 
          userId: userId 
        },
        attributes: ['userBidId']
      });
      const userBidId = Id.map(result => ({
        id : result.getDataValue('userBidId')
      }));

    //  Update the isWinner column to true for the winning bid
    await userBidDetailsModel.update(
      { isWinner: true },
      { where: { userBidId:userBidId[0].id,auctionId: auctionId, } }
    );

    // Update the Item's isSold field to true
    await Item.update({ isSold: true }, { where: { auctionId } });

    console.log("Winner declared!");
    return res.status(200).json({ message: "Winner declared!" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({  });
  }
};

export default {
  generateWinner,
};
