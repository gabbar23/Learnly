import express from "express";
import auth from "./../util/authentication";
import registerCont from "../controllers/registerCont";
import adminController from "../controllers/adminCont";

const router = express.Router();

// POST /api/v1/register/
router.post("/registerUser", registerCont.registerUser);
router.get("/showUsers",auth.requireAuth ,registerCont.showUser);
router.post("/is-user-present", registerCont.checkUserExists);
router.post("/checkLoginCredentials", registerCont.checkLoginCredentials);
router.get("/verifiedSellers", adminController.getVerfiedSellers);
router.put("/markAsVerified", adminController.markAsVerifiedSeller);

export const registerRoutes = router;
