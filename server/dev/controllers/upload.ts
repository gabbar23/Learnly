import { Request, Response } from "express";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv' 
// import crypto from 'crypto';
import sharp from 'sharp';
import { ImageDetailModel } from "../models/imageDetails";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

console.log("Req Received for Upload Controller");

// const accessKey = process.env.accessKey;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// const bucketRegion = process.env.BUCKET_REGION;
// const bucketName = process.env.BUCKET_NAME;

const accessKey = 'AKIA4C5UR2PMKV2ZI2EO';
const secretAccessKey = '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';
const bucketRegion = 'ca-central-1';
const bucketName='bidforgood';

// const randomImageName = (bytes = 32)=>{
//     crypto.randomBytes(bytes).toString('hex');
// }

const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region:bucketRegion
});

const uploadImage = async(req: Request, res: Response) => {
    const newBuffer = await sharp(req.file?.buffer).resize({height:1920, width:1080, fit: 'contain'}).toBuffer();
    // const currentImageName = req.file?.originalname + randomImageName() + " ";
    const params = {
        Bucket:bucketName,
        Key: req.file?.originalname,
        Body: newBuffer,
        ContentType: req.file?.mimetype,
    };
    const getObjectParams = {
        Bucket: bucketName,
        Key: req.file?.originalname,
    };
    const getObjCommand = new GetObjectCommand(getObjectParams);
    const command = new PutObjectCommand(params);
    try{
        await s3.send(command);
        const url = await getSignedUrl(s3, getObjCommand);
        ImageDetailModel
        .create({
            imgName:req.file?.originalname,
            imgDescription:'Testing upload',
            imgUrl:url,
        })
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    }catch(e){
        console.log("Error Occured in AWS \n",e);
    }
};

const getUploadedImage = async(req: Request, res: Response)=>{
try{
   const allImages:any =   await ImageDetailModel.findAll();
   for(let i = 0; i < allImages.length; i++){
    const img = allImages[i]['dataValues'];
    const getObjectParams = {
        Bucket: bucketName,
        Key: img.imgName,
       };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        img.imgUrl = url;
   }
   res.send(allImages);
}catch(e){
    console.log("ERROR IN IMAGE FETCHING",e);
    res.status(500).json({
        message: e,
      });
    }
    console.log(req);
};


export default{
    uploadImage,
    getUploadedImage
}