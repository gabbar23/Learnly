import express from "express";
import reportCont from "../controllers/reportCont";
const router = express.Router();

// POST /api/report/
router.post("/addReport", reportCont.addReport);
router.get("/getReport", reportCont.getReport);
export const reportRoutes = router;
