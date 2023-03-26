import express from "express";
import wishListCont from "../controllers/wishlistCont";

const router = express.Router();

// POST /api/wishlist/
router.post("/addWishlist", wishListCont.addWishlist);
router.get("/getWishlist", wishListCont.getWishlist);

export const wishListRoutes = router;
