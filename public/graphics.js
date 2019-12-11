var scene = new THREE.Scene();
// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// Create a renderer "with Antialiasing"
var renderer = new THREE.WebGLRenderer({antialias:false});

function gfxZ () {
  this.shadows = false;
  // DEP this.antialias = false;


  this.start = function() {
    camera.position.z = 1;
    // Configure renderer clear color
    renderer.setClearColor("#000000");
    // Configure renderer size
    renderer.setSize( window.innerWidth, window.innerHeight );
    // Append Renderer to DOM
    document.body.appendChild( renderer.domElement );

    renderer.domElement.id = 'main';
    main_container.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = this.shadows; //shadows on/off
    renderer.shadowMap.autoUpdate = false; // do not automatically update the shadow map
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //renderer.gammaInput = true;
    //renderer.gammaOutput = true;
    console.log(123);
  }

  this.createGround = function() {
    // Floor
    grassTex = THREE.ImageUtils.loadTexture('images/grass2.png'); grassTex.wrapS = THREE.RepeatWrapping; grassTex.wrapT = THREE.RepeatWrapping; grassTex.repeat.x = 256; grassTex.repeat.y = 256; var groundMat = new THREE.MeshPhongMaterial({map:grassTex}); 

    var groundGeo = new THREE.PlaneGeometry(400,400); 
    var ground = new THREE.Mesh(groundGeo,groundMat);
    ground.position.z = -1;// fix this 
    scene.add(ground);
  }

  this.startLighting = function () {
    var light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );  
    scene.add( light );
  }

  this.createSky = function () {
    var skyGeo = new THREE.SphereGeometry(100, 25, 25); 
    var loader  = new THREE.TextureLoader(),
        texture = loader.load( "images/sky.jpg" );
    var material = new THREE.MeshPhongMaterial({ 
        map: texture,
    });
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    scene.add(sky);
  }


  this.startTests = function () {
    // Create a Cube Mesh with basic material
    var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    var material = new THREE.MeshPhongMaterial( { color: "#00FF00" } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 5;
    scene.add(cube);
    /*
    function loadModel() {
      object.traverse( function ( child ) {
        if ( child.isMesh ) child.material.map = texture;
      } );
      //object.position.y = - 95;
      scene.add( object );
    }
    var manager = new THREE.LoadingManager( loadModel );
    //manager.onProgress = function ( item, loaded, total ) {
    //  console.log( item, loaded, total );
    //};
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/tree.obj', function ( obj ) {
      object = obj;
    }) //,onProgress, onError );*/

    //11

    /*
    const gltfStore = {};
    const loader2 = new THREE.GLTFLoader();
    // Load a glTF resource
    loader2.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/hand-rigged.glb",
      function(gltf) {
        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        // gltf.scene.children[0].children[0].material = material;
        gltfStore.animations = gltf.animations;
        gltf.scene.children[0].position.z=1;
        gltfStore.mixer = new THREE.AnimationMixer(gltf.scene.children[0]);
        //speed up animation * 2
        gltfStore.mixer.timeScale = 2;
        gltfStore.mixer.clipAction(gltfStore.animations[0]).play();
      },
      // called when loading is in progresses
      function(xhr) {
        console.log(xhr.loaded / xhr.total * 100 + "% loaded");
      },
      // on load error
      function(error) {
        console.log("An error happened");
      }
    );

    function animate() {
      requestAnimationFrame(animate);
      if (gltfStore.mixer && gltfStore.animations) {
        gltfStore.mixer.update(clock.getDelta());
        renderer.render(scene, camera);
      }
    }

    animate();*/
    //11
  }
}