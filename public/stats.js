if (0) {
  console.log("Running stats debug program...");
  var rendererStats	= new THREEx.RendererStats();
  rendererStats.domElement.style.position	= 'absolute';
  rendererStats.domElement.style.left	= '0px';
  rendererStats.domElement.style.bottom	= '0px';
  document.body.appendChild( rendererStats.domElement );

  var stats	= new Stats();
  stats.domElement.style.position	= 'absolute';
  stats.domElement.style.right	= '0px';
  stats.domElement.style.bottom	= '0px';
  document.body.appendChild( stats.domElement );
}