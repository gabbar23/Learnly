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

const showAuctionDetails = (_req : Request, _res: Response) => {
    // const itme = Item.findAll({
    //     where:{

    //     },
    //     attributes: [
    //         [
    //           sequelize.fn(sequelize.col("item_id") ),
    //           "province_name",
    //         ],
    //       ],
    // });
    console.log("fectching details");
}

export default{
    makeBid,
    showCurrentAuctions,
    showAuctionDetails,
    
}