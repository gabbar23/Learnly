import express from "express";
import bodyParser from "body-parser";
import session  from "express-session";
import cors from "cors";


import { registerRoutes } from "./routes/registerRoutes";
import { fetch } from "./routes/formRoutes";
// import { sellerModel } from "./models/sellerModel";
// import { StatesCity } from "./models/citiesState";

import { UserDetail } from "./models/userDetailModel";
import { Bidding } from "./models/biddingModel";
import { Report } from "./models/reportsModel";
import { LoginDetail } from "./models/loginDetailModel";
import { Item } from "./models/itemModel";
import { sequelize } from "./util/database";


declare module 'express-session' {
  interface Session{
    userId: string;
  }
}

const app = express();

app.use(
  session({
    secret: 'wearegroup5', // replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true if using HTTPS
      maxAge: 60 * 60 * 1000, // session expires after 1 day
      httpOnly:true,
    }
  })
);


//api configration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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

// UserDetail.sync({ force: true }).then((_) => {
//   console.log("UserDetails Loaded");
// });
// syncing models
sequelize
  .sync()
  .then((_) => {
    console.log("Models Loaded");
  })
  .catch((error: Error) => {
    console.log(error);
  });

app.listen(3000);
