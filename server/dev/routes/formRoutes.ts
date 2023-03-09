import express from "express";
import multer from "multer";

import citiesStatesCont from "../controllers/citiesStatesCont";
import uploadCont from "../controllers/uploadCont";
import fetchBidItems from "../controllers/fetchBidItems";
import fetchBidDetails from "../controllers/fetchBidDetails";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/fetch/fetchCity
router.get("/fetchStates", citiesStatesCont.fetchStates);
router.get("/fetchCity", citiesStatesCont.fetchCity);
router.post("/single-upload", upload.single("image"), uploadCont.uploadImage);
router.get("/upload", uploadCont.getUploadedImage);
router.get("/fetchBidItems", fetchBidItems.fetchBidItems);
router.get("/fetchBidDetails", fetchBidDetails.fetchBidDetails);


export const fetch = router;
