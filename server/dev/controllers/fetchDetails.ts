// import { Request, Response } from "express";
// import { ImageDetailModel } from "../models/imageDetails";
// import { Item } from "../models/itemModel";

// //To fetch the image details of each items
// const fetchImageDetails = async (_req: Request, res: Response) => {
//   try {
//     const imageDetails = await ImageDetailModel.findOne({
//         include: [{
//             model: Item,
//             attributes: ['itemId'] 
//           }]
//     });

//     if (!imageDetails) {
//       return res.status(404).json({ message: "Image details not found." });
//     }
   
//     console.log(imageDetails.getDataValue(0));
//     const result = {
//       imgId: imageDetails.getDataValue('imgId'),
//       itemId: imageDetails.getDataValue('itemId'),
//       imageUrl: imageDetails.getDataValue('imgUrl'),
//       imageDes: imageDetails.getDataValue('imgDescription'),
//       imageName: imageDetails.getDataValue('imgName'),
//    };

//     console.log(result);

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

// export default {
//   fetchImageDetails,
// };

// import { Request, Response } from "express";
// import { Bidding } from "../models/biddingModel";

// //Fecth the bid details
// const fetchBidDetails = async (req: Request, res: Response) => {
//     try {
      
//       const bid_type = req.body.bidType;
//       var details ;

//       //fetches the details of specific bid type
//       if(bid_type != null){
//        details = await Bidding.findAll({
//           where: {
//               bidType:bid_type
//           }
//         });
//       }

//       //fetches the details of all the bid type
//       else{
//          details = await Bidding.findAll({});
//       }
//     res.status(200).json(details);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  
// export default  {
//     fetchBidDetails,
// };
// //# sourceMappingURL=fetchBidDetails.js.map


// import { Request, Response } from "express";
// import { Item } from "../models/itemModel";
// const fetchBidItems = async (_req: Request, res: Response) => {
//     try {
//       const items = await Item.findAll({
//       order: [
//             ['itemName', 'ASC']
//         ],
//       });
//       res.status(200).json(items);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  
// export default  {
//     fetchBidItems,
// };

// // //# sourceMappingURL=fetchBidItems.js.map