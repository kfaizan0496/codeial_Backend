module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer,{  cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"]
    }});
    io.sockets.on('connect',function(socket){
  console.log(" new connection received",socket.id);
  
   socket.on('disconnect',function(){
    console.log("socket is disconnected");
  
      })

      socket.on('join_room',function(data){
        console.log("joining Request received",data);
        socket.join(data.chatroom);
        io.in(data.chatroom).emit('user_joined',data);
      })
    
     //CHANGE::detect send_message and broadcast to everyone in the room

      socket.on('send_message',function(data){
        console.log("detected send button event",data.message);
        io.in(data.chatroom).emit('receive_message',data)
      });
      
    });
   
    
}