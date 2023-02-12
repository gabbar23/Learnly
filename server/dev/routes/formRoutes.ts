import express from "express";

import {fetchCity} from "../controllers/fetchCities";

const router = express.Router();

// POST /api/fetch/fetchCity
router.get("/fetchCity", fetchCity);
// router.post("/fetchCity", fetchCity);

export const fetch = router;
