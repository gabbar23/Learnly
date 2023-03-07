import { DataTypes } from "sequelize";
import { sequelize } from "../util/database";

const biddingModel = sequelize.define("bidding", {
  bidId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isSold: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  bidType: {
    type: DataTypes.ENUM("live", "blind"),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});
export const Bidding = biddingModel;
