import { Request, Response } from "express";
import { Auction } from "../models/aunctionModel";
import { userBidDetailsModel } from "../models/userBidDetails";

const placeBid = async (req: Request, res: Response) => {
try {

// Extract data from request body
  const {
    itemId,
    bidAmount,
    auctionId,
    userId
   } = req.body;
  
   // Retrieve the auction by ID
   const auction = await Auction.findOne({ where:{user_id:userId} });

   // Check if the user ID associated with the auction matches the current user ID
   if (auction != null) {
     return res.status(401).json({ message: "You are not authorized to access this bid" });
   }
    const userBids = await userBidDetailsModel.create({
        bidAmount,
        itemId,
        auctionId,
        userId
      })
    res.status(200).json(userBids);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
export default  {
    placeBid,
};

// //# sourceMappingURL=fetchBidItems.js.map