import { DataTypes } from "sequelize";
import { sequelize } from "../util/database";

const ImageDetail = sequelize.define("imageDetails", {
  imgId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  imgDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgUrl: {
    type: DataTypes.STRING(4000),
    allowNull: true,
  }
},
{
  timestamps:false,
});

export const ImageDetailModel = ImageDetail;
