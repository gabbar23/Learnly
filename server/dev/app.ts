import express from "express";
import bodyParser from "body-parser";

import { registerRoutes } from "./routes/registerRoutes";
import { fetch } from "./routes/formRoutes";
import { sellerModel } from "./models/sellerModel";
import { StatesCity } from "./models/citiesState";

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
