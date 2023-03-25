import { Request, Response } from "express";
import { Auction } from "../models/aunctionModel"
import { sequelize } from "../util/database";

//Fetch Bid Time 
const fetchBidTime = async (req: Request, res: Response) => {
    const auctionId = req.body.auctionId;
    try {
        // fetches the time details
        if (auctionId != null) {
            const auction = await Auction.findOne({
                attributes: [
                    [sequelize.literal("TIMEDIFF(endTime,startTime) "), "duration"],
                ],
                where: { auctionId: auctionId },
            });
            res.status(200).json(auction);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export default {
    fetchBidTime,
};
