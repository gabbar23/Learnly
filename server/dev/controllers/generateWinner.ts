import { Request, Response } from "express";

import { Auction } from "../models/aunctionModel";
import { userBidDetailsModel } from "../models/userBidDetails";
import { Item } from "../models/itemModel";
import { sequelize } from "../util/database";
import { DataTypes, QueryTypes } from "sequelize";
import { sendEmail } from "../util/emailSender";

const Winner = sequelize.define('winner', {
    
     firstName:{
        field: 'firstName',
        type: DataTypes.STRING
     },
     lastName:{
        field: 'lastName',
        type: DataTypes.STRING
     },

     email:{
        field: 'email',
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
const generateWinner = async (_req: Request, res: Response) => {
  //const auctionId = req.body.auctionId;
  const now = new Date();
  const auctions = await Auction.findAll({
    where: {
      auctionType: ['live', 'blind']
    }
  });

  for (let i = 0; i < auctions.length; i++) {
    const auction = auctions[i];

    // Check if auction has ended
    if (now > auction.getDataValue("endTime")) {
      const auctionId = auction.getDataValue("auctionId");
      console.log("id",auctionId);

  try {
    // Find the auction with the given ID
    const auction = await Auction.findOne({ where: { auctionId } });
    
    if (!auction) {
      throw new Error(`Auction with ID ${auctionId} not found`);
    }

    // Check if any bids exist for the auction
    const bidsExist = await userBidDetailsModel.findOne({
      where: {
        auctionId: auctionId,
      },
    });

    if (!bidsExist) {
      // No bids exist for the auction
      console.log(`No bids exist for auction ${auctionId}`);
      continue;
    }

    const results = await sequelize.query(
      `
      SELECT u.firstName, u.lastName, l.email, maxBid, u.userId
      FROM UserDetails u
      INNER JOIN (
       SELECT userId, userBidId, MAX(bidAmount) AS maxBid
      FROM userBidDetails
      WHERE auctionId = :auctionId
      AND isWinner = false
      GROUP BY userId
      ) b ON u.userId = b.userId
      INNER JOIN items i ON i.auctionId = :auctionId
      INNER JOIN loginDetails l ON l.user_id = u.userId 
      WHERE b.maxBid = (
          SELECT MAX(bidAmount) 
      FROM userBidDetails 
      WHERE auctionId = :auctionId
      AND i.isSold = false
       )
     AND b.maxBid > i.startPrice
      `,
      {
        type: QueryTypes.SELECT,
        replacements: { auctionId: auctionId },
        mapToModel: true,
        model: Winner

      }
    );
    
    if(results !=null)
    {
      const winners = results.map(result => ({
        firstName: result.getDataValue('firstName'),
        lastName: result.getDataValue('lastName'),
        userId: result.getDataValue('userId'),
        bidAmount : result.getDataValue('maxBid'),
        email:result.getDataValue("email")
      }));
      
    //console.log(winners);
    if(winners != undefined)
    {
      const firstname=  winners[0].firstName;
      const lastName=  winners[0].lastName;
      const bidAmount = winners[0].bidAmount;
      const userId = winners[0].userId;
      const email = winners[0].email;

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
      sendEmail("Congratulations!!"+firstname+lastName+"you have won the auction",email );
      return res.json({ message: "Winner declared!" });
      }
    }
      
  } catch (err) {
    console.log(err);
    return res.json({ message:"No winner found" });
    }
   }
  }
};

export default {
  generateWinner,
};
