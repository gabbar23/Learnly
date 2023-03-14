import { DataTypes } from "sequelize";
import { sequelize } from "../util/database";

const ItemModel = sequelize.define("item", {
  itemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemDes: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  startPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

export const Item = ItemModel;