import { Request, Response } from "express";

// import { sequelize } from "../util/database";
import { Auction } from "../../models/aunctionModel";
import { ImageDetailModel } from "../../models/imageDetails";
import { Item } from "../../models/itemModel";
import { userBidDetailsModel } from "../../models/userBidDetails";
import { QueryTypes } from "sequelize";
import { sequelize } from "../../util/database";

// import * as model from "../../models";
import { UserDetail } from "../../models/userDetailModel";
// import { Socket,Server } from "socket.io";

const makeBid = (req: Request, res: Response) => {
  console.log("Bid hit", res, req);
};

const showCurrentAuctions = (req: Request, res: Response) => {
  console.log("fetch Auction list", res, req);
};

const getAuctionDetails = async (req: Request, res: Response) => {
  try {
    await Auction.findOne({
      where: {
        auctionId: req.body.bidId,
      },
    }).then((result) => {
      // console.log(result);
      res.status(200).json(result);
    });
  } catch {
    console.log("getAuctionDetails Failed");
  }
};

const getAuctionItemDetails = async (req: Request, res: Response) => {
  try {
    const userCount = await checkForUser(req, res);
    
    await Item.findOne({
      where: {
        itemId: req.body.itemId,
      },
      include:[{
        model:ImageDetailModel
      }]
    }).then((result) => {
      res.status(200).json({
        item: result,
        userCount: userCount // add the userCount to the response object
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

interface CountResult {
  'COUNT(userId)': number;
}

const checkForUser = async (req: Request, res: Response) => {
  var userId = req.body.userId;
  var auctionId = req.body.auctionId;
  var itemId = req.body.itemId;
  try {
    const results: CountResult[] = await sequelize.query(
      `
      select count(userId) as "COUNT(userId)" from userBidDetails 
      where itemId = ` + itemId + ` and auctionId = ` + auctionId + ` and userId = ` + userId + `;
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const count = results[0]['COUNT(userId)'];
    console.log("No of users", count);
    return count;
    
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



const getImages =async (req:Request, res: Response) => {
  
    await ImageDetailModel.findAll({
      where:{
        itemId: req.body.itemId,
      }
    })
    .then((result)=>{
      // console.log(result)
      res.status(200).json(result);
    })
    .catch((result)=>{
      res.status(500).send(result);
    });

}

const endTime = (_req: Request, res: Response) => {
  console.log("timer");

  res.status(200).json({
    message: {
      time: 3000,
    },
  });
};


const findMaxBidAmount = (req : Request, res : Response) => {

    userBidDetailsModel.max("bidAmount",{
      where:{
        itemId : req.body.auctionId
      }
    })
    .then((result)=>{
      res.status(200).json(result);
    })
    .catch((res)=>{
      console.log(res);
    });

}


const findMyBidAmount = (req : Request , res : Response) => {
  
  userBidDetailsModel.max("bidAmount",{
    where:{
      itemId : req.body.auctionId,
      userId : req.body.userId
    }
  })
  .then((result)=>{
    res.status(200).json(result);
  })
  .catch((res)=>{
    console.log(res);
  });
}

const validateAmount = () => {
  console.log();
};

const topFiveUsers = (req:Request , res: Response) =>{
  
  const auctionId = req.body.auctionId;

  userBidDetailsModel.findAll({
    where: {
      auctionId: auctionId,
    },
    include:{
      model:UserDetail,
      attributes:["firstName","lastName"]
    },
    attributes:["bidAmount"],
    order: [["bidAmount", "DESC"]],
    limit: 5
  })
  .then((result) => {
    
    console.log("5 User send to Client.");
    res.status(200).send(result);

  })
  .catch((result)=>{
    console.log("topFiveUsers in auctionHandler Failed." + result);
    res.status(401).send({message: "Top Five user can not be fetched for this auction." });
  })
}

export default {
  makeBid,
  showCurrentAuctions,
  getAuctionDetails,
  getAuctionItemDetails,
  getImages,
  endTime,
  validateAmount,
  findMaxBidAmount,
  findMyBidAmount,
  checkForUser,
  topFiveUsers,
};



//dont remove the code

// await Auction.findAll({
//   where: {
//     auctionId: req.body.bidId,
//   },
//   include:[{
//     model:Item,
//     where: {
//       itemId: req.body.itemId,
//     },
//     include:[{
//       model:ImageDetailModel,
      
//     }],
  
//   }],