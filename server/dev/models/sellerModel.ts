import { DataTypes } from "sequelize";
import { sequelize } from "../util/database";

const Seller = sequelize.define("seller", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address:{
    type: DataTypes.STRING,
    allowNull : true,
  },
  phone:{
    type : DataTypes.STRING,
    allowNull:false
  },
  postalCode:{
    type:DataTypes.STRING,
    allowNull:false
  },

  dateOfbirth:{
    type: DataTypes.DATE,
    allowNull:false
  },
  city:{
    type: DataTypes.STRING,
    allowNull:false
  },
  province:{
    type:DataTypes.STRING,
    allowNull:false    
  }

},
{
  timestamps:false,
}
);

export const sellerModel = Seller;
