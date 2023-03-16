import { Socket,Server } from "socket.io";
// import { Auction } from "../models/aunctionModel";
import { userBidDetailsModel } from "../models/userBidDetails";
import { Item } from "../models/itemModel";
// import { stat } from "fs";


const addBidOnDB = (itemId:Number,bidVal:Number)=>{

  userBidDetailsModel.create({
    itemId,
    auctionId:itemId,
    isWinner:false,
    bidAmount:bidVal,
    userId:1,
  })
  .then(()=>console.log("Data Stored."))
  .catch(()=>console.log("Data storing failed."));

}


const updateBidData = (itemId:Number, bidVal :Number ) => {

  // Checking if the previous bid exist in auction ,
  // If yes then check the max value with newVal
  userBidDetailsModel.max("bidAmount",{
    where:{
      itemId:itemId,
    }
  })
  .then((result)=>{
    if(result){
      
      const maxVal = result;

      console.log(maxVal);
      
      //updateBidValue(itemId,bidVal);
      
      // Checking if the new Value is bigger than maxVal
      if(maxVal <bidVal){
        console.log("updated");
        addBidOnDB(itemId,bidVal);
        return 1;
      }
      else{
        console.log("new Value is smaller.");
        return 0;
      }

    } 
    else{
      // bidVal
      console.log(result);

      // If the value is does not exist then, it could be the first bid, 
      // so check inside the itemtable where startPrice is stored.

      Item.findOne({
        where:{
          auctionId:itemId
        },
        attributes: ["startPrice"],
        
      })
      .then((result)=>{
        
        console.log("worked = " + result);
        
        if(result){
          
          // Checking if startPrice is bigger than newVal than update the DB.
          let startPrice = result.dataValues.startPrice;
          
          if(startPrice < bidVal){
            
            console.log("updated");
            
            addBidOnDB(itemId,bidVal);
            
            return 1;
          
          }
          else{
            console.log("new Value is smaller.");
            return 0;
          }
        }
        else{
          console.log("Item not found.");
          return 0;
        }
      }).catch(()=>{
        console.log("fail"); 
        return 0;       
      })
    }   
    console.log("successfull");
  })

  return 0
}


// const getCurrentVal = (_auctionId:Number) =>{

// }


export function initSocket(server: any): void {

    const io = new Server(server, {
        cors: {
          origin: 'http://localhost:5173',
          methods: ['GET', 'POST']
        }
      });


    io.on('connection', (socket:Socket)=>{
    
      console.log("user just connected!");
    
      const session = null;

      socket.on('placeBid', (data) => {

        // console.log(data.sessionId,data.bidVal);
        
        if(!session){


          // if(data.bidVal > getCurrentVal())

          const state = updateBidData(1,data.bidVal);
          
          if(state == 1){
            
            const info = {
              highestBid:data.bidVal,
              sessionId:data.sessionId
            }
            
            io.emit('bidUpdate', info);
            // socket.broadcast.emit('','');
          }else
          {
            socket.emit('bidStatus',"small value entered.");
          }

        }else{
         console.log("null");
          socket.emit('login',"Please Login for to participate in auction");

        }
    
      });
    
    
      socket.on('disconnect', () => {
        console.log('User disconnected');
    
        });
    
    });
}