import express from "express";

import addBidItems from "../controllers/addBidItems";
import fetchBidItems from "../controllers/fetchBidItems";
import fetchBidDetails from "../controllers/fetchBidDetails";
import fetchImageDetails from "../controllers/fetchImageDetails";
import fetchDetails from "../controllers/fetchDetails";
 import placeBid from "../controllers/placeBid";

const router = express.Router();

// POST /api/bid/addBidItems
// GET  /api/bid/fetchBidItems
router.post("/addBidDetails", addBidItems.addBidItems);
router.get("/fetchBidItems", fetchBidItems.fetchBidItems);
router.get("/fetchBidDetails", fetchBidDetails.fetchBidDetails);
router.get("/fetchImageDetails",fetchImageDetails.fetchImageDetails);
router.get("/fetchDetails",fetchDetails.fetchDetails);
router.post("/placeBid",placeBid.placeBid);



export const bidRoutes = router;
