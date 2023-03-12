import { Request,Response } from "express";


// import { sequelize } from "../util/database";
// import {Item} from "../../models/itemModel";
// import { Socket,Server } from "socket.io";



const makeBid = (req: Request,res: Response) =>{

    console.log("Bid hit",res,req);
}

const showCurrentAuctions = (req: Request,res:Response )=>{
    console.log("fetch Auction list",res,req);
}

const getAuctionDetails = (_req : Request, res: Response) => {
    
    console.log("fectching details");

    res.status(200).json({
        message: {
          startTime:new Date().toLocaleString(),
          endTime:new Date().toLocaleString(),
          startVal:100,
        },
      });
    
}

const endTime = (_req : Request, res : Response)=> {
    
    console.log("timer");

    res.status(200).json({
        message: {
          time:3000
        },
      });
}



export default{
    makeBid,
    showCurrentAuctions,
    getAuctionDetails,
    endTime,
}