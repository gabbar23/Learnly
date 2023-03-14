import io from 'socket.io-client';
import type {Socket} from 'socket.io-client'
import { computed, defineComponent, onMounted ,reactive, ref, watch } from "vue";


let socket = ref<Socket>();


export function initSocket(): void {

    // Connection to socket at server
socket.value = io("http://localhost:3000/");
    
// Listen for 'chat message' events from the server

socket.value.on('connection', (message:string) => {

  console.log("connected");  

});
     
socket.value.on('disconnect', () => {
  console.log('user disconnected');
});
    


}