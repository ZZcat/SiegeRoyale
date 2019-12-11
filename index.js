const express = require('express');
const app = express();
const serv = require('http').Server(app);

app.use('/', express.static(__dirname + '/public/'));

serv.listen(2000);
console.log('Server started.');

console.log( serv.address());

const io = require('socket.io')(serv, {'pingInterval': 2000, 'pingTimeout': 5000}); // timeout in ms

const fs = require('fs');

var users = {};
var world = {};

setInterval(() => {
	//update();
	//send();
}, 1000 / 60);

io.sockets.on('connection', function (socket)
{
    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function (username) {
      socket.username = username;
      console.log("User has joined");
      console.log(username);
      users[socket.id] = socket.username; //users.push(socket.username);
      world[socket.id] = {"x": 0, "y": 0, "z": 0, "rotZ": 0};
      io.sockets.emit("userList", users);
      console.log("LOG 5");

      // Nest these other functions to force the user to login
      socket.on('updatePosition', function (x, y, z, rotZ) { // Also on timeout
        world[socket.id] = {"x": x, "y": y, "z": z, "rotZ": rotZ};
        io.sockets.emit("worldPositions", world);
        //console.log(world);
      });
      socket.on('disconnect', function () { // Also on timeout
        console.log("disconnect");
        delete users[socket.id];
        delete world[socket.id];
      });

    });
})

setInterval(() => {
  var clients = io.sockets.clients();
	//console.log("---\n",clients.in,"---\n");


}, 1*1000);