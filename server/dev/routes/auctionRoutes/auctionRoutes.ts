import express from "express";
import auctionHandler from "../../controllers/liveAuctionController/auctionHandler";
// import multer from 'multer';


const router = express.Router();

router.post("/auctionDetails",auctionHandler.getAuctionDetails);
router.post("/auctionEndTime",auctionHandler.endTime);

export const auctionRoutes = router;