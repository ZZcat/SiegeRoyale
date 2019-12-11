function inGameMenuZ () {
  this.gameGUI = new dat.GUI({ autoPlace: false, width: 400 });
  this.start = function () {
    gameGUI = this.gameGUI
    gameGUI.domElement.id = 'gui';
    gui_container.appendChild(gameGUI.domElement);

    var gameGUI1 = gameGUI.addFolder('Player Hacks');
    var gameGUI2 = gameGUI.addFolder('Pointer');

    gameGUI1.add(player.pos, 'x', -20, 201).listen();
    gameGUI1.add(player.pos, 'y', -20, 20).listen();
    gameGUI1.add(player.pos, 'z', -20, 20).listen();
    gameGUI1.add(config, 'pingSpoof', 50, 500).listen();
    // gameGUI2.add(config, 'name').listen();

    gameGUI2.add(config, 'mouseSensitivity', 0, 0.03).listen();
    gameGUI2.add(config, 'crossHairSize', 0, 0.15).listen();
    gameGUI2.add(config, 'crossHairThickness', 1, 5, 1).listen();




    gameGUI.add({ resume:function(){ gameGUI.hide(); canvas.requestPointerLock(); setInterval(server.updatePosition, config["pingSpoof"]); updateSettings() }}, 'resume');
    //mouseSensitivity
    gameGUI1.open();
    gameGUI2.open();
  }
  this.hide = function (){
    this.gameGUI.hide()
  }
  this.show = function (){
    this.gameGUI.show()
  } 
}