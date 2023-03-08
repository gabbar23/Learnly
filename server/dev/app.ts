import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from 'http';

import { registerRoutes } from "./routes/registerRoutes";
import { fetch } from "./routes/formRoutes";
import { sellerModel } from "./models/sellerModel";
import { StatesCity } from "./models/citiesState";
import { Socket,Server } from "socket.io";

const app = express();

const server: http.Server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173/"
  }
});

io.on('connection', (socket:Socket)=>{
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
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

//syncing models
sellerModel
  .sync()
  .then((_) => {
    console.log("Seller Details Loaded");
  })
  .catch((error: Error) => {
    console.log(error);
  });

  StatesCity
  .sync()
  .then((_) => {
    console.log("Region Loaded");
  })
  .catch((error: Error) => {
    console.log(error);
  });


app.listen(3000);
