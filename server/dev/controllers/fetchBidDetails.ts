import { Request, Response } from "express";
import { Bidding } from "../models/biddingModel";

const fetchBidDetails = async (_req: Request, res: Response) => {
    try {
      console.log("fetch live bid details");
      const details = await Bidding.findAll({
        where: {
            bidType:'live'
        }
      });
      res.status(200).json(details);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
export default  {
    fetchBidDetails,
};
//# sourceMappingURL=fetchBidDetails.js.map