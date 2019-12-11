txt = document.getElementById("txt");
//txt.style.cssText = "display: block;margin:auto 0;padding:0 0 3px 3px;text-align:center;background-color:#200;top: 50%;left: 50%;";
txt.innerHTML = "Not connected to the server<br/>This will change to a player list after the server is connected";


function MainUser() {
  this.Tstart = new Date().getTime();
  this.Tend = new Date().getTime();

  this.movementSpeed = 0.2; // Player movement speed
  //init stuff
  this.pos = {
    x: 0,
    y: 0,
    z: 0
  }
  this.vel = {
    x: 0,
    y: 0,
    z: 0
  }
  this.acl = {
    x: 0,
    y: 0,
    z: 0
  }
  this.updateCam = function () {
    camera.position.x = this.pos.x;
    camera.position.y = this.pos.y;
    camera.position.z = this.pos.z+1;
  }
  this.moveWalk = function (x, y, z) {
    this.pos.x += x*this.movementSpeed;
    this.pos.y += y*this.movementSpeed;
    this.pos.z += z*this.movementSpeed; 
  }
  this.jump = function () {
    if (this.pos.y == 0) {
      self.vel = 2;
    }
  }
  this.push = function (x, y, z) {
    this.vel.x += x;
    this.vel.y += y;
    this.vel.z += z;
  }
  this.tick = function () { // Vel and acl updates
    this.Tend = new Date().getTime();
    this.timeFactor = (this.Tend-this.Tstart)/18; // Player movement speed
    this.Tstart = new Date().getTime();
    this.vel.x += this.acl.x*this.timeFactor;
    this.vel.y += this.acl.y*this.timeFactor;
    this.vel.z += this.acl.z*this.timeFactor;

    this.pos.x += this.vel.x*this.timeFactor;
    this.pos.y += this.vel.y*this.timeFactor;
    this.pos.z += this.vel.z*this.timeFactor;

    // Gravity
    if (this.pos.z>0) {
      this.vel.z -= 0.03*this.timeFactor;
    }
    if (this.pos.z<0) {
      this.pos.z = 0;
    }
  }
};

function txtControl() {
  this.shown = true;
  this.hide = function () {
    this.shown = false;
    txt.hidden = true;
  }
  this.show = function () {
    this.shown = true;
    txt.hidden = false;
  }
}

let player = new MainUser();
let playerList = new txtControl();
playerList.hide()