import { Request, Response } from "express";
import { cityProvince } from "../models/citiesState";
import { sequelize } from "../util/database";

console.log("req recevied for fetching city");

const fetchStates = async (req: Request, res: Response) => {
  try {
    //Retrieval from db
    console.log(req);
    const provinces = await cityProvince.findAll({
      attributes: [
        [
          sequelize.fn("DISTINCT", sequelize.col("province_name")),
          "province_name",
        ],
      ],
      order: [["province_name", "ASC"]],
    });
    res.status(200).json(provinces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchCity = async (req: Request, res: Response) => {
  try {
    //retrievel from db 

    const cities = await cityProvince.findAll({
      where: {
        province_name: req.query.province,
      },
      attributes: ["city"],
      // distinct: true,
      order: [["city", "ASC"]],
    });
    //console.log(cities)
    res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Getting city and States
export default {
  fetchCity,
  fetchStates,
};