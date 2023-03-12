import express from "express";
import auction from "../../controllers/liveAuctionController/auctionHandler";
// import multer from 'multer';


const router = express.Router();

router.post("/auctionDetails",auction.getAuctionDetails);
router.post("/auctionEndTime",auction.endTime);

export const auctionRoutes = router;