import express from "express";
import auth from "./../util/authentication";
import registerCont from "../controllers/registerCont";

const router = express.Router();

// POST /api/v1/register/createSeller
router.post("/registerUser", registerCont.registerUser);
router.get("/showUsers",auth.requireAuth ,registerCont.showUser);
router.post("/is-user-present", registerCont.checkUserExists);
router.post("/checkLoginCredentials", registerCont.checkLoginCredentials);

export const registerRoutes = router;
