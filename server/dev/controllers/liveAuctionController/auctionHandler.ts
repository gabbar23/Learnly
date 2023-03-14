import { Request,Response } from "express";


// import { sequelize } from "../util/database";
import {Bidding} from "../../models/biddingModel";
import {Item} from "../../models/itemModel"
// import { Socket,Server } from "socket.io";



const makeBid = (req: Request,res: Response) =>{

    console.log("Bid hit",res,req);
}

const showCurrentAuctions = (req: Request,res:Response )=>{
    console.log("fetch Auction list",res,req);
}

const getAuctionDetails = async (req : Request, res: Response) => {
    
  try {

    await Bidding.findOne({

      where: {
        bidId: req.body.bidId,
      },
    
    }).then((result)=>{
      res.status(200).json(result);
    });
  }catch{
    console.log("getAuctionDetails Failed");
  }
    
}

const getAuctionItemDetails = async (req: Request, res: Response) =>{

  try {

    await Item.findOne({

      where: {
        itemId: req.body.itemId,
      },
    
    }).then((result)=>{
      res.status(200).json(result);
    });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }  

}


const endTime = (_req : Request, res : Response)=> {
    
    console.log("timer");

    res.status(200).json({
        message: {
          time:3000
        },
      });
}


const validateAmount = () => {
  console.log();
}


export default{
    makeBid,
    showCurrentAuctions,
    getAuctionDetails,
    getAuctionItemDetails,
    endTime,
    validateAmount,
    
}