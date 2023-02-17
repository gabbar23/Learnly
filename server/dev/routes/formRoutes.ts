import express from "express";

import  region from "../controllers/fetchCities";

const router = express.Router();

// POST /api/fetch/fetchCity
router.get("/fetchStates", region.fetchStates);
router.get("/fetchCity", region.fetchCity);

export const fetch = router;
