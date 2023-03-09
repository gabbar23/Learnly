import { Request, Response } from "express";
// import { sellerModel } from "../models/sellerModel";
import { UserDetail } from "../models/userDetailModel";
import { LoginDetail } from "../models/loginDetailModel";
// register User
export const registerUser = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const isVerified = req.body.isVerified;
  const isBuyer = req.body.isBuyer;
  const phone = req.body.phone;
  const address = req.body.address;
  const cityName = req.body.cityName;
  const provinceName = req.body.provinceName;
  const govtIdUrl = req.body.govtIdUrl;
  const email = req.body.email;
  const password = req.body.password;
  const postalCode = req.body.postalCode;
  try {
    const userDetail = await UserDetail.create({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender,
      isVerified: isVerified,
      isBuyer: isBuyer,
      govtIdUrl: govtIdUrl,
      phone: phone,
      address: address,
      cityName: cityName,
      provinceName: provinceName,
      postalCode: postalCode,
    });
    const userId = userDetail.get().userId;
    // Create a new LoginDetail instance and associate it with the UserDetail instance
    const loginDetail = await LoginDetail.create({
      user_id: userId,
      email: email,
      isAdmin: "false",
      password: password,
    });

    res.status(201).json({
      message: {
        userDetail: userDetail.get({ plain: true }),
        loginDetail: loginDetail.get({ plain: true }),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const showUser = (req: Request, res: Response) => {
  console.log(req);
  UserDetail.findAll({
    attributes: [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "isVerified",
      "isBuyer",
      "govtIdUrl",
      "phone",
      "address",
      "cityName",
      "provinceName",
    ],
  }).then((result) => {
    res.send(result);
  });
};

export const checkUserExists = async (req: Request, res: Response) => {
  try {
    const reqUserEmail = req.body.email;
    const result = await LoginDetail.findOne({
      where: {
        email: reqUserEmail,
      },
    });

    if (result) {
      res.send(result);
    } else {
      res.send([]);
    }
  } catch (error) {
    console.error("Error checking if user exists:", error);
    res.send([]);
  }
};

export default {
  registerUser,
  showUser,
  checkUserExists,
};
