import express from "express";
import auction from "../../controllers/liveAuctionController/auctionHandler";
// import multer from 'multer';


const router = express.Router();

router.post("/auctionDetails",auction.getAuctionDetails);
router.post("/auctionItemDetails",auction.getAuctionItemDetails);
router.post("/auctionImages",auction.getImages);
router.post("/auctionEndTime",auction.endTime);
router.post("/highestPrice",auction.findMaxBidAmount);
router.post("/myBidValue",auction.findMyBidAmount);
router.post("/topFiveUsers",auction.topFiveUsers);

export const auctionRoutes = router;