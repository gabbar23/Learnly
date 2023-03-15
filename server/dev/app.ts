import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import http from "http";
import session from "express-session";

import { registerRoutes } from "./routes/registerRoutes";
import { fetch } from "./routes/formRoutes";
import { bidRoutes } from "./routes/bidRoutes";
import { orderRoutes } from "./routes/orderRoutes";
import { auctionRoutes } from "./routes/auctionRoutes/auctionRoutes";
// import { Socket,Server } from "socket.io";

// import { sellerModel } from "./models/sellerModel";
// import { StatesCity } from "./models/citiesState";

import { UserDetail } from "./models/userDetailModel";
import { Auction } from "./models/aunctionModel";
import { Report } from "./models/reportsModel";
import { LoginDetail } from "./models/loginDetailModel";
import { Item } from "./models/itemModel";
import { sequelize } from "./util/database";
import { ImageDetailModel } from "./models/imageDetails";
// import {UserBidding} from "./models/userBidDetailsModel";
import { userBidDetailsModel } from "./models/userBidDetails";

import { initSocket } from "./util/socket";

declare module "express-session" {
  interface Session {
    userId: string;
  }
}

const app = express();

const server: http.Server = http.createServer(app);

// Initialize your Socket.io server
initSocket(server);

app.use(
  session({
    secret: "wearegroup5", // replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true if using HTTPS
      maxAge: 60 * 60 * 1000, // session expires after 1 day
      httpOnly: true,
    },
  })
);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST']
//   }
// });

// const io = new Server(server);

// io.on('connection', (socket:Socket)=>{

//   console.log("user just connected!");

//   socket.on('placeBid', (data) => {
//     // Update the bid in the database
//     // ...

//     console.log("bid pressed",data);
//     // Emit a bid update event to all connected clients

//     socket.emit('bidUpdate', (data + 20));
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

// });

//api configration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
app.use("/api/bid", bidRoutes);
app.use("/api/v1/sell", orderRoutes);
app.use("/api/auction/", auctionRoutes);

UserDetail.hasMany(Report, { foreignKey: "user_id" });
Report.belongsTo(UserDetail, { foreignKey: "user_id" });

UserDetail.hasOne(LoginDetail, { foreignKey: "user_id" });

LoginDetail.belongsTo(UserDetail, { foreignKey: "user_id" });

// City belongsTo State

UserDetail.hasMany(Item, { foreignKey: "user_id" });

// Item belongsTo User
Item.belongsTo(UserDetail, { foreignKey: "userId" });
UserDetail.hasMany(Item , {foreignKey: "userId"});

// User hasMany Auctions
UserDetail.hasMany(Auction, { foreignKey: "user_id" });

// Auction belongsTo User
Auction.belongsTo(UserDetail, { foreignKey: "user_id" });

//userBidDetailsModel

Item.hasMany(userBidDetailsModel, { foreignKey: "itemId" });
userBidDetailsModel.belongsTo(Item, { foreignKey: "itemId" });

//UserDetail.hasMany(userBidDetailsModel,{foreignKey: "user_id"});

Auction.hasMany(userBidDetailsModel, { foreignKey: "bidId" });
userBidDetailsModel.belongsTo(Auction, { foreignKey: "bidId" });

Item.hasMany(ImageDetailModel, { foreignKey: "itemId" });
ImageDetailModel.belongsTo(Item, { foreignKey: "itemId" });

UserDetail.hasMany(userBidDetailsModel, { foreignKey: "userId" });
userBidDetailsModel.belongsTo(UserDetail, { foreignKey: "userId" });

// syncing models
// userBidDetailsModel.sync({force:true}).then((_:any)=>{
//   console.log("Models Loaded");
// })
// orderDetail.sync({ force: true }).then((res) => {
//   console.log(res);
// });
// Auction.sync({ force: true }).then((res) => {
//   console.log(res);
// });
sequelize
  .sync()
  .then((_) => {
    console.log("Models Loaded");
  })
  .catch((error: Error) => {
    console.log(error);
  });

server.listen(3000);
