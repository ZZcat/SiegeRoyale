const fs = require('fs'); // File reading and writing

const express = require('express');
const app = express();
const serv = require('http').Server(app);


const io = require('socket.io')(serv, {'pingInterval': 2000, 'pingTimeout': 5000}); // timeout in ms

app.use('/', express.static(__dirname + '/public/'));
console.log("Trying to start server...");
serv.listen(2000);
/*serv.listen(function(){
  var address = serv.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});*/
console.log('Server started.');
console.log( serv.address());

// File Reading/Writing:
var serverData = {}
function ZserverFile() {
  this.read = function () {
    // Create backup
    fs.createReadStream('ZserverData.csv').pipe(fs.createWriteStream('ZserverData'+Date.now()+'.csv'));
    // Read
    serverData = JSON.parse(fs.readFileSync('ZserverData.csv', {encoding: 'utf-8'}))
  }
  this.write = function () {
    // Write
    fs.writeFile('ZserverData.csv', JSON.stringify(serverData, null, 2), (err) => {
    if (err) throw err;
    // This line will run on pass
    });
  }
};


var users = {};
var world = {"online":{}, "offline":{}};

serverFile = new ZserverFile();
serverFile.read();
console.log(serverData, 1);
world = serverData["world"];
console.log(world);
console.log(555);



setInterval(() => {
	serverData = {"world": world};
  serverFile.write()
}, 5*1000); // Backup every 5 seconds

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
      world["online"][socket.id] = {"x": 0, "y": 0, "z": 0, "rotZ": 0};
      io.sockets.emit("userList", users);
      console.log("LOG 5");

      // Nest these other functions to force the user to login
      socket.on('updatePosition', function (x, y, z, rotZ) { // Also on timeout
        world["online"][socket.id] = {"x": x, "y": y, "z": z, "rotZ": rotZ};
        io.sockets.emit("worldPositions", world);
        //console.log(world);
      });
      socket.on('disconnect', function () { // Also on timeout
        console.log("disconnect");
        delete users[socket.id];
        world["offline"][socket.id] = world["online"][socket.id];
        delete world["online"][socket.id];
				console.log("disconnect passed")
      });

    });
})

setInterval(() => { // Kick clients who appear connected in world (from file) but that don't have a socket connection
  var clients = io.sockets.clients();
	//console.log("---\n",Object.keys(clients['connected']),"---\n");
	//console.log("C:" + Object.keys(clients['connected']));
	for (onlineID in world["online"]) {
		if (!Object.keys(clients['connected']).includes(onlineID)) {
			console.log("Autokicking "+onlineID)
			delete users[onlineID];
			world["offline"][onlineID] = world["online"][onlineID];
			delete world["online"][onlineID];
			console.log("autokick done")
		}
	}
}, 1*1000);
