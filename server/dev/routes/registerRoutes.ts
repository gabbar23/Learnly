import express from "express";

import * as registerCont from "../controllers/registerCont";

const router = express.Router();

// POST /api/v1/register/createSeller
router.post("/createSeller", registerCont.registerSeller);

export const registerRoutes = router;