import { Request, Response } from "express";
import { sellerModel } from "../models/sellerModel";

//register User
const registerSeller = (req: Request, res: Response) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const age = req.body.age;

  //saving data in db
  sellerModel
    .create({
      fname: fname,
      lname: lname,
      email: email,
      age: age,
    })
    .then((result) => {
      res.status(201).json({
        message: result.get({ plain: true }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

const showUser = (req : Request , res : Response) =>{

    console.log(req);
    sellerModel.findAll({
      
      attributes: [
          "fname","lname","address","email","phone"
      ]
  }).then((result)=>{
      res.send(result);
  })
}

export default{
  registerSeller,
  showUser,  
}
