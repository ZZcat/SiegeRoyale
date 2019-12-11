window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}




// Control modes: 1 [keyboard],  2[gamePad],  3[touch]
var controlModes = [1];

// Control locks: 1 [Main Menu],  2[In Game Menu],  3[Game]
var controlLock = 3;

function move() {
  if (controlModes.includes(1)) {move1()}
  if (controlModes.includes(2)) {move2()}
}

// Keyboard
var keys = {};
window.onkeyup = function(e)   { keys[e.keyCode] = false; menuControl();}
window.onkeydown = function(e) { keys[e.keyCode] = true;  }

var distance = 0.1;

var a,b,t,c,d;

var scale = 0.5;
var x = 1;
var mouseX = 0;
var mouseY = 0;

// Mouse -- > Rotation
const angle = { z: 0, x: Math.PI / 2 };
document.addEventListener('mousemove', e => {
  if (controlLock == 3) {
    e.preventDefault();
    angle.z += e.movementX * config["mouseSensitivity"];
    angle.x -= e.movementY * config["mouseSensitivity"];
    //socket.emit('angle', angle.z);
    if (angle.x < 0) angle.x = 0;
    if (angle.x > Math.PI) angle.x = Math.PI;
    camera.rotation.set(0.8, 0, 0);
    camera.rotation.x = angle.x;
    camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -angle.z);
}});

// Capture mouse pointer
document.addEventListener('click', e => {
  if (1) {
    e.preventDefault();
    //canvas.requestPointerLock();
    //console.log("CLick");
    //socket.emit('shoot', angle.z);
  }
});

// WASD
function move1() { //WASD 87 65 83 68
  [a,b] = [(Math.sin(angle.z) * Math.sin(angle.x)), (Math.cos(angle.z) * Math.sin(angle.x))];
  if (b==0) forwardMoveAngle = 2*a; // Avoid "/0" error
  if (b!=0) forwardMoveAngle = Math.atan(a/b);
  if (Math.sign(b)==-1){
    forwardMoveAngle += Math.PI
  }
  //console.log(a,b,forwardMoveAngle);
  // W key
  if (keys[87] == true){
    player.moveWalk(
      Math.sin(forwardMoveAngle), 
      Math.cos(forwardMoveAngle), 
      0);
  }
  // A key
  if (keys[65] == true){
    player.moveWalk(
    Math.sin(forwardMoveAngle-Math.PI/2),
    Math.cos(forwardMoveAngle-Math.PI/2),
    0);
  }
  // S key
  if (keys[83] == true){
    player.moveWalk(
    -Math.sin(forwardMoveAngle),
    -Math.cos(forwardMoveAngle),
    0)
  }
  // D key
  if (keys[68] == true){
    player.moveWalk(
    Math.sin(forwardMoveAngle+Math.PI/2),
    Math.cos(forwardMoveAngle+Math.PI/2),
    0)
  }
  if (keys[32] == true){ //s Spacebar
    if (player.pos.z==0) {
      player.push(0, 0, 0.5); // Jump 
    }
  }
  if (keys[9] == true){ // Tab
    playerList.show();
  }
  if (keys[9] == false){ // Tab
    playerList.hide();
  }
}

document.addEventListener('keydown',this.keyHandler,false); // Prevent tab from moving cursor out of website (tab moves between elements in many browsers)
    function keyHandler(e) {
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            this.value += "    ";
            if(e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }
    }

//Gamepad

//when controller connected, page will show: "Gamepad connected"
window.addEventListener("gamepadconnected", function(e) {
  console.log("Connected to gamepad");
  controlModes.push(2);
});

//when controller disconnected, page will show: "Gamepad disconnected"
window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Disconnected from gamepad");
  controlModes.filter(controlModes.indexOf(2),1);
});

function move2() {
  var gamepad = navigator.getGamepads()[0]; //get the first controller.
  if (gamepad && gamepad.connected) {
      //check if direction buttons (UP, DOWN, LEFT, RIGHT) was pressed
	var axes = gamepad.axes;
	for (var i in axes) {
	  //if (axes[i] != 0) { console.log('axes[%s] value is: %s', i, axes[i]); };
	};
	// to check if other buttons(A,B,C,D,OK,Exit...) was pressed
	var buttons = gamepad.buttons;
	for (var i in buttons) {
	  if (buttons[i].pressed == true) { console.log("buttons[%s] pressed", i); };
	};

  //Rotation if (!(axes[3]==0 && axes[4]==0))
  angle.z += axes[2]/20;
  angle.x -= axes[3]/20;
  if (!(angle.x > 0)) angle.x = 0;
  if (angle.x > Math.PI) angle.x = Math.PI;
  camera.rotation.set(0.8, 0, 0);
  camera.rotation.x = angle.x;
  camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -angle.z); 
  if (buttons[0].pressed == true)
  {
      console.log("j");
    if (camera.position.z <= 1){
      camera.position.z+=3;
    }
  }

  //Movement


  [a,b] = [(Math.sin(angle.z) * Math.sin(angle.x)), (Math.cos(angle.z) * Math.sin(angle.x))];
  if (b==0) forwardMoveAngle = 2*a; // Avoid "/0" error
  if (b!=0) forwardMoveAngle = Math.atan(a/b);
  if (Math.sign(b)==-1){
    forwardMoveAngle += Math.PI
  }
  camera.position.x += -axes[0]*Math.sin(forwardMoveAngle+axes[0]);
  camera.position.y += -axes[1]*Math.cos(forwardMoveAngle+axes[1]);
  };
}


///////////////////// Touchscreen support
if (window.PointerEvent) {
    if(window.navigator.maxTouchPoints>1)
    {
      //document.write("Using pointer event controls...");
      document.addEventListener("pointermove", touchControl);
      document.write("z");
    } else
    {
      //document.write("Pointer events are not fully supported on your browser")
    }
} else {
    document.write("Pointer events are not supported")
}

function touchControl(event) {
  txt.innerHTML = "l";
    if(event.buttons>0)
        //context.fillRect(event.clientX, event.clientY, 5, 5);
        txt.innerHTML = event.clientX, event.clientY;
}

//-------------------------------//
function menuControl() {
  if (keys[27] === true) {
    if (controlModes.includes(1)) {menuControl1()}
    if (controlModes.includes(2)) {menuControl2()}
  }
}

function menuControl1() {
    keys[27] = false; // Only run once... 
    if (controlLock==2) {
      canvas.requestPointerLock();
      console.log("A lock");
    }
}