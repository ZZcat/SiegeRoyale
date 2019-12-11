var gameGUI;

function gameZ() {



  let gfx = new gfxZ();
  let inGameMenu = new inGameMenuZ

  this.start = function() {
    gfx.start();
    gfx.createGround();
    gfx.startTests();
    gfx.startLighting(); // Lights (aka fps killers)
    gfx.createSky();

    inGameMenu.start()

    updateSettings();

    var clock = new THREE.Clock();
    var render = function () {
      //console.log(document.hasFocus())
      if (document.pointerLockElement ) {
        controlLock = 3;
      }
      if (document.pointerLockElement==null && controlLock==3) {
        controlLock = 2; // Drop to in game menu
        gameGUI.show();
      }

      if (controlLock == 2) {
        menuControl();
      }

      if (controlLock == 3) { // In Game
        move();
        player.updateCam();
        player.tick();
      }

      requestAnimationFrame( render );
      // Render the scene
      renderer.render(scene, camera);
      //rendererStats.update(renderer); 
      //stats.update(); // These call stats.js
    };
    render();
  }
}

let game = new gameZ;