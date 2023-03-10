import { Request, Response } from "express";
import { LoginDetail } from "../models/loginDetailModel";
import { UserDetail } from "../models/userDetailModel";

console.log("Admin Controller");

const getVerfiedSellers = async (req: Request, res: Response) => {
    try {
      console.log(req);
      const verifiedSellers = await UserDetail.findAll({
        include:[{
          model:LoginDetail,
          attributes: ['email', 'isVerified'],
          where:{
            isVerified:0,
          }
        }],attributes:[
          "userId",
          "firstName",
          "lastName",
          "dateOfBirth",
          "isBuyer",
          "isSeller",
          "phone",
          "address",
          "cityName",
          "provinceName",
          "postalCode",
          "govtIdUrl"
        ],where:{
          isSeller:1
        }
      });
      if(verifiedSellers.length > 0){
        res.status(200).json(verifiedSellers);
      }else{
        res.status(200).json([]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  };
  const markAsVerifiedSeller = async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId;
      await LoginDetail.update({isVerified:1},{
        where:{
            userId:userId,
        }
      });
      res.status(200).json({
        isSuccessfull:true,
        message:"Details Updated Successfully"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  };

  export default{
    getVerfiedSellers,
    markAsVerifiedSeller
  }