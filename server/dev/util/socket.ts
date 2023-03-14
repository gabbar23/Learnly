import { Socket,Server } from "socket.io";


export function initSocket(server: any): void {

    const io = new Server(server, {
        cors: {
          origin: 'http://localhost:5173',
          methods: ['GET', 'POST']
        }
      });


    io.on('connection', (socket:Socket)=>{
    
      console.log("user just connected!");
    
      socket.on('placeBid', (data) => {

        console.log(data.sessionId,data.bidVal);

        const info = {
          highestBid:data.bidVal,
          sessionId:data.sessionId
        }
        
        
        io.emit('bidUpdate', info);
    
      });
    
    
      socket.on('disconnect', () => {
        console.log('User disconnected');
    
        });
    
    });
}