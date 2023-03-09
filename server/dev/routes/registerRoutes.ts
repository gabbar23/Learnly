import express from "express";

import registerCont from "../controllers/registerCont";

const router = express.Router();

// POST /api/v1/register/createSeller
router.post("/registerUser", registerCont.registerUser);
router.get("/showUsers", registerCont.showUser);
router.post("/is-user-present", registerCont.checkUserExists);
router.post("/checkLoginCredentials", registerCont.checkLoginCredentials);
export const registerRoutes = router;
