// // // import { Request, Response } from "express";
// // // import { ImageDetailModel } from "../models/imageDetails";
// // // import { Auction } from "../models/aunctionModel";
// // // import { Item } from "../models/itemModel";

// // // const fetchDetails = async (req: Request, res: Response) => {
// // //     try {
// // //       const auctionType = req.body.auctionType;
  
// // //       const [auctionDetail] = await Promise.all([

// // //         //Fetches the details of specific auction type
// // //         auctionType != null ?
// // //           Auction.findAll({
// // //             where: {
// // //                 auctionType: auctionType
// // //             }
// // //           }) :
// // //           // fetches the details of all the bid type
// // //           Auction.findAll({})
// // //         ])

// // //       const [auctionItems] = await Promise.all([
// // //           auctionDetail != null?
// // //           Item.findAll({
// // //             include: [{
// // //               model: Auction,
// // //               attributes: ['auctionlId'] 
// // //             }],
// // //             order: [
// // //               ['itemName', 'ASC']
// // //             ]
// // //           }):null
// // //         ]);

// // //       const [imageDetails] = await Promise.all([
// // //         auctionItems != null?
// // //           ImageDetailModel.findAll({
// // //             include: [{
// // //                 model: Item,
// // //                 attributes: ['itemId'] 
// // //               }]
// // //         })
// // //         : null
// // //       ]);
  
// // //       if (!imageDetails) {
// // //         return res.status(404).json({ message: "Image details not found." });
// // //       }
// // //       // && auctionItems!= null && auctionDetail != null?
// // //       // const result = {
// // //       //   imgId: imageDetails.getDataValue('imgId'),
// // //       //   itemId: imageDetails.getDataValue('itemId'),
// // //       //   imageUrl: imageDetails.getDataValue('imgUrl'),
// // //       //   imageDes: imageDetails.getDataValue('imgDescription'),
// // //       //   imageName: imageDetails.getDataValue('imgName'),
// // //       //   auctionItems: auctionItems,
// // //       //   auctionDetail: auctionDetail
// // //       // };
  
// // //       //return res.status(200).json(result);
// // //     } catch (error) {
// // //       console.error(error);
// // //       return res.status(500).json({ message: "Internal server error." });
// // //     }
// // //   };
  
// // //   export default {
// // //     fetchDetails
// // //   };

// // import { Request, Response } from "express";
// // import { ImageDetailModel } from "../models/imageDetails";
// // import { Auction } from "../models/aunctionModel";
// // import { Item } from "../models/itemModel";

// // const fetchDetails = async (req: Request, res: Response) => {
// //   try {
// //     const auctionType = req.body.auctionType;

// //     const auctionDetail = await Auction.findAll({
// //       where: auctionType ? { auctionType } : {},
// //     });

// //     const [imageDetails] = auctionDetail.length
// //       ? await Promise.all([
// //           ImageDetailModel.findOne({
// //             include: {
// //               model: Item,
// //               attributes: ["itemId"],
// //             },
// //           }),
// //           Item.findOne({
// //             include: {
// //               model: Auction,
// //               attributes: ["auctionId"],
// //             },
// //             order: [["itemName", "ASC"]],
// //           }),
// //         ])
// //       : [null, null];

// //     if (!imageDetails) {
// //       return res.status(404).json({ message: "Image details not found." });
// //     }

// //     // const result = {
// //     //   imgId: imageDetails.getDataValue("imgId"),
// //     //   itemId: imageDetails.getDataValue("itemId"),
// //     //   imageUrl: imageDetails.getDataValue("imgUrl"),
// //     //   imageDes: imageDetails.getDataValue("imgDescription"),
// //     //   imageName: imageDetails.getDataValue("imgName"),
// //     //   auctionItems,
// //     //   auctionDetail,
// //     // };

// //     return res.status(200).json(imageDetails);
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error." });
// //   }
// // };

// // export default {
// //   fetchDetails,
// // };

// import { Request, Response } from "express";
// import { ImageDetailModel } from "../models/imageDetails";
// import { Auction } from "../models/aunctionModel";
// import { Item } from "../models/itemModel";

// const fetchDetails = async (req: Request, res: Response) => {
//   try {
//     // const { auctionType } = req.body;

//     // const [auctionDetail] = await Promise.all([
//     //   // Fetches the details of specific auction type
//     //   auctionType != null
//     //     ? Auction.findAll({
//     //         where: {
//     //           auctionType,
//     //         },
//     //       })
//     //     : // Fetches the details of all the bid type
//     //       Auction.findAll({}),
//     // ]);


//     // const [imageDetails,auctionItems] = auctionDetail.length
//     //   ? await Promise.all([
//     //     Item.findOne({
//     //       include: {
//     //         model: Auction,
//     //         attributes: ["auctionType"],
//     //       },
//     //       order: [["itemName", "ASC"]],
//     //     }), ImageDetailModel.findOne({
//     //         include: {
//     //           model: Item,
//     //           attributes: ["itemId"],
//     //         },
//     //       }),
//     //      ,
//     //     ])
//     //   : [null, null];

    
//     // if (imageDetails != null) {
//     //   const result = {
//     //     auctionDetail,
//     //     auctionItems,
//     //     imgId: imageDetails.getDataValue("imgId"),
//     //     itemId: imageDetails.getDataValue("itemId"),
//     //     imageUrl: imageDetails.getDataValue("imgUrl"),
//     //     imageDes: imageDetails.getDataValue("imgDescription"),
//     //     imageName: imageDetails.getDataValue("imgName"),
//     //   };
//       return res.status(200).json(result);
     
//     }
//     //else{
//       return res.status(404).json({ message: "Image details not found." });
//     //}

   
   
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

// export default {
//   fetchDetails,
// };
