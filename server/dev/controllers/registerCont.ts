import { Request, Response } from "express";
// import { sellerModel } from "../models/sellerModel";
import { UserDetail } from "../models/userDetailModel";
//register User
export const registerUser = async (req: Request, res: Response) => {
  const firstNames = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const age = req.body.age;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const isVerified = req.body.isVerified;
  const phone = req.body.phone;
  const streetAddress = req.body.streetAddress;
  const cityName = req.body.cityName;
  const provinceName = req.body.provinceName;
  console.log(firstNames);

  console.log(req.body);

  try {
    //saving data in db
    const result = await UserDetail.create({
      firstName: firstNames,
      lastName: lastName,
      email: email,
      age: age,
      dateOfBirth: dateOfBirth,
      gender: gender,
      isVerified: isVerified,
      phone: phone,
      streetAddress: streetAddress,
      cityName: cityName,
      provinceName: provinceName,
    });

    res.status(201).json({
      message: result.get({ plain: true }),
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const showUser = (req: Request, res: Response) => {
  console.log(req);
  sellerModel
    .findAll({
      attributes: ["fname", "lname", "address", "email", "phone"],
    })
    .then((result) => {
      res.send(result);
    });
};

export const checkUserExists = (req: Request, res: Response) => {
  // const reqUserEmail = req.body.email;
  // LoginDetail.findOne({where: {
  //   email: reqUserEmail
  // }}).then(result =>{
  //   if(result){
  //     res.send(result);
  //   }else{
  //     res.send([]);
  //   }
  // });
  console.log(req);
  res.send([]);
};

export default {
  registerUser,
  showUser,
  checkUserExists,
};
