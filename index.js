var express = require("express");
var app = express();
 
var http = require("http").createServer(app);
var io = require("socket.io")(http, { 
    cors: {    
      origin: "*",    
      methods: ["GET", "POST"]  
    }});
 
    http.listen(3000, function () {
        console.log("Server connected");
     
        io.on("connection", function (socket) {
            console.log("User " + socket.id);
    
            socket.on("join_room",( room ,cb)=> {
              socket.join(room);
              cb(`Joined ${room}`)
            });
     
            socket.on("messageSocket", (room,message) => {
                console.log(message);
                console.log(room);
              
                if(room === ""){
                  socket.broadcast.emit("receive_message", message);
                }else{
                  socket.to(room).emit("receive_message", message);
                }
               
            });
        });
    });