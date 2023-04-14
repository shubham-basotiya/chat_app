const express = require('express'); 
const app = express();
const path = require('path');
const { disconnect } = require('process');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

http.listen(3000, () => console.log("listening on http://localhost:3000"));


io.on("connection", function(socket){
    // console.log("socket connected");
    console.log("user connected :" + socket.id);

    socket.on('message', function(msg){
        io.emit("message", msg);
    });

    socket.on('disconnect', function() {
        console.log("user disconnected : " + socket.id);
    });
});