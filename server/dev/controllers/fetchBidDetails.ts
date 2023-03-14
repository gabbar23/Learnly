import { Request, Response } from "express";
import { Bidding } from "../models/biddingModel";

//Fecth the bid details
const fetchBidDetails = async (req: Request, res: Response) => {
    try {
      console.log("fetch live bid details");
      const bid_type = req.body.bidType;
      var details ;
      if(bid_type != null){
       details = await Bidding.findAll({
          where: {
              bidType:bid_type
          }
        });
      }
      else{
         details = await Bidding.findAll({});
      }
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