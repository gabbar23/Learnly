import express from "express";

import userOperations from "../controllers/registerCont";

const router = express.Router();

// POST /api/v1/register/createSeller
router.post("/createSeller", userOperations.registerSeller);
router.get("/showUsers", userOperations.showUser);

export const registerRoutes = router;
