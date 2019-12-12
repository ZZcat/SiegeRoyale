const fs = require('fs'); // File reading and writing

const express = require('express');
const app = express();
const serv = require('http').Server(app);


const io = require('socket.io')(serv, {'pingInterval': 2000, 'pingTimeout': 5000}); // timeout in ms

app.use('/', express.static(__dirname + '/public/'));
serv.listen(2000);
console.log('Server started.');
console.log( serv.address());

// File Reading/Writing:
var serverData = {}
function ZserverFile() {
  this.read = function () {
    // Create backup
    fs.createReadStream('ZserverData.csv').pipe(fs.createWriteStream('ZserverData'+Date.now()+'.csv'));
    // Read
    fs.readFile('ZserverData.csv', function (err, data) {
      if (err) throw err;
      serverData = JSON.parse(data);
    });
  }
  this.write = function () {
    // Write
    fs.writeFile('ZserverData.csv', JSON.stringify(serverData, null, 2), (err) => {
    if (err) throw err;
    // This line will run on pass
    });
  }
};
serverFile = new ZserverFile();
serverFile.read();

var users = {};
var world = {};


setInterval(() => {
	serverData = {"world": world};
  serverFile.write()
}, 15*1000); // Backup every 15 seconds

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
