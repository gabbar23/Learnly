import { Request, Response } from "express";
import { UserDetail } from "../models/userDetailModel";

console.log("Admin Controller");

const getVerfiedSellers = async (req: Request, res: Response) => {
    try {
      //Retrieval from db
      console.log(req);
      const verifiedSellers = await UserDetail.findAll({
        attributes: [
            "userId",
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
        where: {
            isSeller: 1,
            isVerified: 0,
          }
      });
      // const transformedSellers:any = verifiedSellers.map(user => {
      //   return {
      //     id: user.userId,
      //     fullName: `${user.firstName} ${user.lastName}`,
      //   };
      // });
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
      await UserDetail.update({isVerified:1},{
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