import { Request,Response } from "express";
// import { sequelize } from "../util/database";

const makeBid = (req: Request,res: Response) =>{

    console.log("Bid hit",res,req);
}

const showCurrentAuctions = (req: Request,res:Response )=>{
    console.log("fetch Auction list",res,req);
}

export default{
    makeBid,
    showCurrentAuctions,

    
}