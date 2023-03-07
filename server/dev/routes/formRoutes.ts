import express from "express";
import multer from "multer";

import region from "../controllers/fetchCities";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/fetch/fetchCity
router.get("/fetchStates", region.fetchStates);
router.get("/fetchCity", region.fetchCity);
router.post("/single-upload", upload.single("image"), uploadFunc.uploadImage);
router.get("/upload", uploadFunc.getUploadedImage);

export const fetch = router;
