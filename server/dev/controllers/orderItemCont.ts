import { Request, Response } from "express";
import { sequelize } from "../util/database";
import { QueryTypes } from "sequelize";

import { orderDetail } from "../models/orderDetailsModel";

export const addOrder = async (req: Request, res: Response) => {
  const { buyerId, sellerId, itemId } = req.body;
  try {
    const order = await orderDetail.create({
      buyerId: buyerId,
      sellerId: sellerId,
      itemId: itemId,
    });

    res.status(201).json({
      message: {
        order: order.get({ plain: true }),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const { buyerId } = req.body;
  try {
    // Fetch all order details and include associated items
    const results = await sequelize.query(
      `SELECT orderId,buyerId,orderDetails.itemId,items.itemName,items.startPrice,items.itemDes
      FROM orderDetails
      JOIN items ON orderDetails.itemId = items.itemId
      WHERE orderDetails.buyerId = buyerId;`,
      {
        replacements: { buyerId: buyerId },
        type: QueryTypes.SELECT,
      }
    );

    // Return the order details as JSON
    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching orders" });
  }
};

export default {
  addOrder,
  getOrder,
};
