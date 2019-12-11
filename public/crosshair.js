function updateCrossHairs (){
  var cH = $('#crosshair-h'),
      cV = $('#crosshair-v');

  cH.css('width', window.innerHeight*config["crossHairSize"]);
  cV.css('height', window.innerHeight*config["crossHairSize"]);

  cV.css('width', config["crossHairThickness"]+"px");
  cH.css('height', config["crossHairThickness"]+"px");

}