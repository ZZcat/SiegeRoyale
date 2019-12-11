txt = document.getElementById("txt");
//txt.style.cssText = "display: block;margin:auto 0;padding:0 0 3px 3px;text-align:center;background-color:#200;top: 50%;left: 50%;";
txt.innerHTML = "cats are the<br/>best";


function MainUser() {
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
    this.vel.x += this.acl.x;
    this.vel.y += this.acl.y;
    this.vel.z += this.acl.z;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.pos.z += this.vel.z;

    // Gravity
    if (this.pos.z>0) {
      this.vel.z -= 0.03;
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