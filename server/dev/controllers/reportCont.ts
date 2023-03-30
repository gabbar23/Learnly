import { Request, Response } from "express";
import { Report } from "../models/reportsModel";

const addReport = async (req: Request, res: Response) => {
  const { user_id, description, issueType } = req.body;
  console.log(user_id);

  try {
    const report = await Report.create({
      user_id,
      description,
      issueType,
    });
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReport = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const report = await Report.findAll({ where: { user_id: user_id } });
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateReport = async (req: Request, res: Response) => {
  try {
    const { ticketId, isResolved } = req.body;
    const report = await Report.update(
      { isResolved: isResolved },
      { where: { ticketId: ticketId } }
    );
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.status(200).json({ message: "Report Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  addReport,
  getReport,
  updateReport,
};

// //# sourceMappingURL=fetchBidItems.js.map
