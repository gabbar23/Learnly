import { Request, Response } from "express";
import { hashPassword, checkPassword } from "../util/passwordHashing";
import { UserDetail } from "../models/userDetailModel";
import { LoginDetail } from "../models/loginDetailModel";
// import { fetchInstance } from "../util/dbMethods";
// register User
export const registerUser = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const isBuyer = req.body.isBuyer;
  const isSeller = req.body.isSeller;
  const phone = req.body.phone;
  const address = req.body.address;
  const cityName = req.body.cityName;
  const provinceName = req.body.provinceName;
  const govtIdUrl = req.body.govtIdUrl;
  const email = req.body.email;
  const password = req.body.password;
  const postalCode = req.body.postalCode;
  let userId = "";
  try {
    const userDetail = await UserDetail.create({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender,
      isBuyer: isBuyer,
      isSeller: isSeller,
      govtIdUrl: govtIdUrl,
      phone: phone,
      address: address,
      cityName: cityName,
      provinceName: provinceName,
      postalCode: postalCode,
    });
    userId = userDetail.get().userId;
    // Create a new LoginDetail instance and associate it with the UserDetail instance
    const hashedPassword = await hashPassword(password);
    const loginDetail = await LoginDetail.create({
      user_id: userId,
      email: email,
      isAdmin: "false",
      isVerified: "false",
      password: hashedPassword,
    });

    res.status(201).json({
      message: {
        userDetail: userDetail.get({ plain: true }),
        loginDetail: loginDetail.get({ plain: true }),
      },
    });
  } catch (err) {
    UserDetail.destroy({
      where: {
        userId: userId,
      },
    });
    console.log();

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
      "isSeller",
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

const checkUserExists = async (req: Request, res: Response) => {
  try {
    const reqUserEmail = req.body.email;
    const result = await LoginDetail.findOne({
      where: {
        email: reqUserEmail,
      },
    });

    if (result) {
      {
        res.status(200).json({
          message: "User Exists",
          isUserAlreadyPresent: true,
        });
      }
    } else {
      res.status(200).json({
        message: "User Doesn't Exists",
        isUserAlreadyPresent: false,
      });
    }
  } catch (error) {
    console.error("Error checking if user exists:", error);
    res.status(500).json({ message: [] });
  }
};

const checkLoginCredentials = async (req: Request, res: Response) => {
  try {
    // let userDetails: any;
    const { email, password } = req.body;

    // Find the user with the given email
    const login = await LoginDetail.findOne({ where: { email } });
    // const user = await UserDetail.findByPk("4");
    // If the user doesn't exist, return an error
    if (!login) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the password matches
    const userpassword = await login.get().password;
    const passwordMatches = checkPassword(password, userpassword);
    passwordMatches.then((result) => {
      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const loginDetails = login.get({ plain: true });

      res.status(200).json({
        message: {
          userId: loginDetails.user_id,
          email: loginDetails.email,
          // isSeller: user.isSeller,
        },
      });
    });

    // // If the password doesn't match, return an error
    // if (userpassword != password) {
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }

    // If the email and password match, return the user object
    // res.status(200).json({ message: "User Authenticated" });
  } catch (error) {
    console.error("Error checking login credentials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  registerUser,
  showUser,
  checkUserExists,
  checkLoginCredentials,
};
