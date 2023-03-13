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
        // Update the bid in the database
        // ...
        
        console.log("bid pressed",data);
        // Emit a bid update event to all connected clients
        
        io.emit('bidUpdate', (data + 20));
        
    
        });
    
    
        socket.on('disconnect', () => {
        console.log('User disconnected');
    
        });
    
    });
}