import express from "express";

import fetchCitiesStates from "../controllers/fetchCitiesStates";

const router = express.Router();

// POST /api/fetch/fetchCity
router.get("/fetchStates", fetchCitiesStates.fetchStates);
router.get("/fetchCity", fetchCitiesStates.fetchCity);

export const fetch = router;
