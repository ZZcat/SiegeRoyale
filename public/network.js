function serverZ (username, port) {

  //function randomChoice(arr) {
  //    return arr[Math.floor(arr.length * Math.random())];
  //}

  var socket = io();

  //socket.connect(2001, "https://siege-royale.zachz.repl.co/", function () {
  //    console.log("Client: Connected to server");
  //});

 // var socket = io.connect('localhost:'+port);

  let id;
  socket.on('id', i => (id = i));
  // random name
  //socket.emit('adduser',  randomChoice(["CrazyCat","JumpingGoat","LeapingLeopard","ViciousLion", "RambunctiousKangoro", "GrumpyGorilla","SneakySnake","PlumpPigion","HappyRabit","SwiftRacoon","HoppingDog","RandomTurtle","ClapingGoose"]));

  socket.emit('adduser', username)

  // Autosend keepalive ping
  //socket.emit('pingY', 999);
  var users = [];
  var world = {};

  socket.on('userList', function (userList) {
    users = userList;
    //console.log(userList);
    //txt.innerHTML = userList.join("<br/>");
    txt.innerHTML = Object.keys( userList ).map( function(key){ return key+"-->"+userList[key] }).join("<br/>") //outputs "foo=0&bar=1"
    
  })

  this.updatePosition = function () {
    socket.emit("updatePosition", player.pos.x, player.pos.y, player.pos.z, angle.z);
    console.log("up");
  };

  //setInterval(this.updatePosition, config["pingSpoof"])

  socket.on("worldPositions", function(newWorld) {
    world = newWorld;
    //txt.innerHTML = Object.keys(world).map( function(key){ return key+"-->"+world[key] }).join("<br/>");
    updateWorld(world);
  })
  txt.innerHTML = Object.keys(world).map( function(key){ return key+"-->"+world[key] }).join("<br/>");

  var people = [];

  var personGeometry = new THREE.BoxGeometry( 1, 2, 3 );
  var personMaterial = new THREE.MeshBasicMaterial( { color: "#8d5524" } );

  updateWorld = function(world) {
    for (const trash of people.keys()) {
      scene.remove(people.pop());
    }
		console.log(world['online']);
    for (const [key1, value1] of Object.entries(world['online'])) {
      if (key1 !== socket.id) {
        person = new THREE.Mesh( personGeometry, personMaterial );
        person.position.x = value1["x"];
        person.position.y = value1["y"];
        person.position.z = value1["z"];
        person.rotation.z = -value1["rotZ"]+Math.PI/2;
        person.castShadow = true;
        people.push(person);
        scene.add(person);
				console.log();
      }
    }
  }
}