import { Request,Response } from "express";
import {StatesCity} from "../models/citiesState";
import { sequelize } from "../util/database";

console.log("req recevied for fetching city");

const fetchStates = (req : Request, res : Response ) => {

    
    //Retreival from db
    console.log(req);
    StatesCity
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

    }


    const fetchCity = ( req : Request ,res : Response ) => {

        StatesCity
          .findAll({
              where: {
                province_name: "Nova Scotia"
            },
              order: [ 
                  ['city','ASC']
              ],
              attributes: [
                  [sequelize.fn('DISTINCT', sequelize.col('city')),'cities'],
              ]
          }).then((result)=>{
              console.log(req);
              res.send(result);
          })

        }
//Getting city and States
export default { 
    fetchCity,
    fetchStates,
}
