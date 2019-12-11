function crossHairZ () {
  var cH = $('#crosshair-h')
  var cV = $('#crosshair-v');
  this.update = function () {

    cH.css('width', window.innerHeight*config["crossHairSize"]);
    cV.css('height', window.innerHeight*config["crossHairSize"]);

    cV.css('width', config["crossHairThickness"]+"px");
    cH.css('height', config["crossHairThickness"]+"px");
  }
  this.hide = function () {
    cH.hide();
    cV.hide();
  }
  this.show = function () {
    cH.show();
    cV.show();
  }
}