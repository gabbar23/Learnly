import { Request, Response } from "express";
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