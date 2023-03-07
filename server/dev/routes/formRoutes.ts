import express from "express";
import multer from 'multer';

import  region from "../controllers/fetchCities";
import uploadFunc from "../controllers/upload"

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// POST /api/fetch/fetchCity
router.get("/fetchStates", region.fetchStates);
router.get("/fetchCity", region.fetchCity);
router.post("/upload", upload.single('idproof'),uploadFunc.uploadImage);
router.get("/upload",uploadFunc.getUploadedImage);

export const fetch = router;