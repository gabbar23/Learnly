import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from 'http';

import { registerRoutes } from "./routes/registerRoutes";
import { fetch } from "./routes/formRoutes";
import {auctionRoutes} from "./routes/auctionRoutes/auctionRoutes"
import { Socket,Server } from "socket.io";

// import { sellerModel } from "./models/sellerModel";
// import { StatesCity } from "./models/citiesState";

import { UserDetail } from "./models/userDetailModel";
import { Bidding } from "./models/biddingModel";
import { Report } from "./models/reportsModel";
import { LoginDetail } from "./models/loginDetailModel";
import { Item } from "./models/itemModel";
import { sequelize } from "./util/database";

const app = express();

const server: http.Server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// const io = new Server(server);

io.on('connection', (socket:Socket)=>{
  
  console.log("user just connected!");

  socket.on('placeBid', (data) => {
    // Update the bid in the database
    // ...
    console.log("bid pressed",data);
    // Emit a bid update event to all connected clients
    
    socket.emit('bidUpdate', (data + 20));
  });


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});


//api configration
app.use(cors());
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
app.use("/api/auction/",auctionRoutes);

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

server.listen(3000);
