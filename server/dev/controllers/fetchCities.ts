import { Request,Response } from "express";
import { cities } from "../models/citiesState";
import { sequelize } from "../util/database";

console.log("req recevied for fetching city");

//Getting city and States
export const fetchCity = (req : Request, res : Response ) => {

    
  //Retreival from db
  console.log(req);
  cities
    .findAll({
        order: [ 
            ['province_name','ASC']
        ],
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('province_name')),'province'],
        ]
    }).then((result)=>{
        res.send(result);
    })
};
