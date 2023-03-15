import { Request, Response } from "express";
import { ImageDetailModel } from "../models/imageDetails";
import { Auction } from "../models/aunctionModel";
import { Item } from "../models/itemModel";

const fetchDetails = async (req: Request, res: Response) => {
    try {
      //const itemId = req.params.itemId;
      const bid_type = req.body.bidType;
  
      const [imageDetails, bidItems, bidDetails] = await Promise.all([
        ImageDetailModel.findOne({
            include: [{
                model: Item,
                attributes: ['itemId'] 
              }]
        }),
        Item.findAll({
          order: [
            ['itemName', 'ASC']
          ]
        }),
        // fetches the details of specific bid type
        bid_type != null ?
          Auction.findAll({
            where: {
              bidType: bid_type
            }
          }) :
          // fetches the details of all the bid type
          Auction.findAll({})
      ]);
  
      if (!imageDetails) {
        return res.status(404).json({ message: "Image details not found." });
      }
  
      const result = {
        imgId: imageDetails.getDataValue('imgId'),
        itemId: imageDetails.getDataValue('itemId'),
        imageUrl: imageDetails.getDataValue('imgUrl'),
        imageDes: imageDetails.getDataValue('imgDescription'),
        imageName: imageDetails.getDataValue('imgName'),
        bidItems: bidItems,
        bidDetails: bidDetails
      };
  
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
  
  export default {
    fetchDetails
  };