import express from "express";

import addBidItems from "../controllers/addBidItems";
import fetchBidItems from "../controllers/fetchBidItems";
import fetchBidDetails from "../controllers/fetchBidDetails";

const router = express.Router();

// POST /api/bid/addBidItems
// GET  /api/bid/fetchBidItems
router.post("/addBidDetails", addBidItems.addBidItems);
router.get("/fetchBidItems", fetchBidItems.fetchBidItems);
router.get("/fetchBidDetails", fetchBidDetails.fetchBidDetails);

export const bidRoutes = router;
