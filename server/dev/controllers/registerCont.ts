import { Request, Response } from "express";
import { hashPassword, checkPassword } from "../util/passwordHashing";
import { UserDetail } from "../models/userDetailModel";
import { LoginDetail } from "../models/loginDetailModel";
import { sendEmail } from "../util/emailSender";
import { WELCOMEMESSAGE } from "../util/constants";
// Registers a new user
export const registerUser = async (req: Request, res: Response) => {
  // Extract data from request body
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    isBuyer,
    isSeller,
    phone,
    address,
    cityName,
    provinceName,
    govtIdUrl,
    email,
    password,
    postalCode,
  } = req.body;

  let userId = "";
  try {
    // Create a new user detail instance
    const userDetail = await UserDetail.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      isBuyer,
      isSeller,
      govtIdUrl,
      phone,
      address,
      cityName,
      provinceName,
      postalCode,
    });

    // Get the user ID
    userId = userDetail.get().userId;

    // Create a new login detail instance and associate it with the user detail instance
    const hashedPassword = await hashPassword(password);
    const loginDetail = await LoginDetail.create({
      user_id: userId,
      email,
      isAdmin: "false",
      isVerified: "false",
      password: hashedPassword,
    });
    sendEmail(WELCOMEMESSAGE, email).then((res) => {
      console.log(res);
    });
    // Send response with user and login details
    res.status(201).json({
      message: {
        userDetail: userDetail.get({ plain: true }),
        loginDetail: loginDetail.get({ plain: true }),
      },
    });
  } catch (err) {
    // If there is an error, delete the user detail instance and send an error response
    UserDetail.destroy({
      where: {
        userId,
      },
    });

    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};

// Retrieves user details
const showUser = (req: Request, res: Response) => {
  console.log(req);

  // Find all user details and send response
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
    const requestedUserEmail = req.body.email;
    const result = await LoginDetail.findOne({
      where: {
        email: requestedUserEmail,
      },
    });

    if (result) {
      res.status(200).json({
        message: "User Exists",
        isUserAlreadyPresent: true,
      });
    } else {
      res.status(200).json({
        message: "User Doesn't Exist",
        isUserAlreadyPresent: false,
      });
    }
  } catch (error) {
    console.error("Error checking if user exists:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const checkLoginCredentials = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const login = await LoginDetail.findOne({ where: { email } });
    if (!login) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const loginDetails = login.get({ plain: true });
    const user = await UserDetail.findByPk(loginDetails.user_id);
    const userDetails = user?.get({ plain: true });

    const passwordMatches = await checkPassword(
      password,
      loginDetails.password
    );
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: {
        userId: loginDetails.user_id,
        email: loginDetails.email,
        isVerified: loginDetails.isVerified,
        isSeller: userDetails.isSeller,
        isBuyer: userDetails.isBuyer,
      },
    });
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
