import express from "express";
import bodyParser from "body-parser";

import { registerRoutes } from "./routes/registerRoutes";
import { fetch } from "./routes/formRoutes";
import {bidRoutes} from "./routes/bidRoutes"
// import { sellerModel } from "./models/sellerModel";
// import { StatesCity } from "./models/citiesState";

import { UserDetail } from "./models/userDetailModel";
import { Bidding } from "./models/biddingModel";
import { Report } from "./models/reportsModel";
import { LoginDetail } from "./models/loginDetailModel";
import { Item } from "./models/itemModel";
import { sequelize } from "./util/database";
import { ImageDetailModel } from "./models/imageDetails";
import {userBidDetailsModel} from "./models/userBidDetails";

const app = express();

//api configration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//api middlewares
app.use("/api/v1/register", registerRoutes);
app.use("/api/fetch", fetch);
app.use("/api/bid",bidRoutes);

UserDetail.hasMany(Report, { foreignKey: "user_id" });
Report.belongsTo(UserDetail, { foreignKey: "user_id" });

UserDetail.hasOne(LoginDetail, { foreignKey: "user_id" });

LoginDetail.belongsTo(UserDetail, { foreignKey: "user_id" });

// City belongsTo State

UserDetail.hasMany(Item, { foreignKey: "user_id" });

// Item belongsTo User
Item.belongsTo(UserDetail, { foreignKey: "user_id" });

// User hasMany Biddings
UserDetail.hasMany(Bidding, { foreignKey: "user_id" });

// Bidding belongsTo User
Bidding.belongsTo(UserDetail, { foreignKey: "user_id" });

Item.hasMany(ImageDetailModel,{foreignKey:"user_id"});

//userBidDetailsModel

Item.hasMany(userBidDetailsModel, { foreignKey: "itemId" });
userBidDetailsModel.belongsTo(Item,{foreignKey:"itemId"})

//UserDetail.hasMany(userBidDetailsModel,{foreignKey: "user_id"});

Bidding.hasMany(userBidDetailsModel,{foreignKey: "bidId"});
userBidDetailsModel.belongsTo(Bidding,{foreignKey:"bidId"})

Item.hasMany(ImageDetailModel,{foreignKey:"itemId"});

UserDetail.hasMany(userBidDetailsModel,{foreignKey: "userId"});
userBidDetailsModel.belongsTo(UserDetail,{foreignKey: "userId"});


// syncing models
// userBidDetailsModel.sync({force:true}).then((_:any)=>{
//   console.log("Models Loaded");
// })
sequelize
  .sync()
  .then((_) => {
    console.log("Models Loaded");
  })
  .catch((error: Error) => {
    console.log(error);
  });

app.listen(3000);
