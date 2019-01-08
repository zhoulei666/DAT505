//Global variables
var renderer, scene, camera, composer, octoMain, skeleton, particle;
var bar01, bar02;
var loader;
var controls;
//var width = 100;
//var height = 100;
var starField
//var radius = 6371;
var clock;
clock = new THREE.Clock();

//Execute the main functions when the page loads

window.onload = function() {
  init();
  geometry();
  animate();
}

function init(){
  //Configure renderer settings-------------------------------------------------
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize( window.innerWidth, window.innerHeight );
  //renderer.autoClear = false;
  //renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);
  //----------------------------------------------------------------------------

  // Create an empty scene

  var background = new THREE.CubeTextureLoader()
    .setPath( 'picture/' )
  	.load( [ 'sky1.jpg', 'sky2.jpg', 'sky3.jpg', 'sky4.jpg', 'sky5.jpg', 'sky6.jpg' ] );
  background.format = THREE.RGBFormat;
	scene = new THREE.Scene();
	scene.background = background;

  /*scene = new THREE.Scene();
  var envMap = new THREE.CubeTextureLoader().load( [
      'picture/sky1.jpg', // right
      'picture/sky2.jpg', // left
      'picture/sky3.jpg', // top
      'picture/sky4.jpg', // bottom
      'picture/sky5.jpg', // back
      'picture/sky6.jpg' // front
    ] );
    envMap.format = THREE.RGBFormat;

    scene.background = envMap;*/
  scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0010 );

  // Create a basic perspective camera
  // camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
  camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 1, 10000);
  camera.position.z = 200;
  camera.position.x = 60;
  camera.position.y = -500;

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  scene.add(camera);

//create audio
  var listener = new THREE.AudioListener();
  camera.add( listener );

// create a global audio source
  var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'sound/bgm.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});




  // Create the lights
  var ambientLight = new THREE.AmbientLight(0x999999, 1);
  scene.add(ambientLight);

  var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );

  light = new THREE.PointLight( 0xffffff, 2, 500 );

  //var textureLoader = new THREE.TextureLoader();

  //var textureFlare = textureLoader.load( "picture/lens.png" );

  //var lensflare = new THREE.Lensflare();

  //lensflare.addElement( new THREE.LensflareElement( textureFlare, 512, 0 ) );

  light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
  scene.add( light );
  /*light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
  light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
  scene.add( light2 );
  light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
  light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
  scene.add( light3 );
  light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
  light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
  scene.add( light4 );*/
  //dirLight = new THREE.DirectionalLight( 0xffffff );
	//	dirLight.position.set( - 1, 0, 1 ).normalize();
	//	scene.add( dirLight );
  let ambient = new THREE.AmbientLight(0xcccccc, 0.6);
  scene.add(ambient);

  //stars
  var starsGeometry = new THREE.Geometry();

  for ( var i = 0; i < 10000; i ++ ) {

	var star = new THREE.Vector3();
	star.x = THREE.Math.randFloatSpread( 2000 );
	star.y = THREE.Math.randFloatSpread( 2000 );
	star.z = THREE.Math.randFloatSpread( 2000 );

	starsGeometry.vertices.push( star );

  }

  var starsMaterial = new THREE.PointsMaterial( { size:1 ,sizeAttenuation: false,color: 0x999999 } );

  starField = new THREE.Points( starsGeometry, starsMaterial );

  //var time = Date.now() * 0.001;
  //starField.rotation.x = time * 0.05;
  //starField.rotation.y = time * 0.025;
  //starField.rotation.z = time * 0.075;
  scene.add( starField );

    /*var i, r = radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];
    				var vertices1 = [];
    				var vertices2 = [];
    				var vertex = new THREE.Vector3();
    				for ( i = 0; i < 250; i ++ ) {
    					vertex.x = Math.random() * 2 - 1;
    					vertex.y = Math.random() * 2 - 1;
    					vertex.z = Math.random() * 2 - 1;
    					vertex.multiplyScalar( r );
    					vertices1.push( vertex.x, vertex.y, vertex.z );
    				}
    				for ( i = 0; i < 1500; i ++ ) {
    					vertex.x = Math.random() * 2 - 1;
    					vertex.y = Math.random() * 2 - 1;
    					vertex.z = Math.random() * 2 - 1;
    					vertex.multiplyScalar( r );
    					vertices2.push( vertex.x, vertex.y, vertex.z );
    				}
    				starsGeometry[ 0 ].addAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
    				starsGeometry[ 1 ].addAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );
    				var stars;
    				var starsMaterials = [
    					new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
    					new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
    					new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
    					new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
    					new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
    					new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
    				];
    				for ( i = 10; i < 30; i ++ ) {
    					stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
    					stars.rotation.x = Math.random() * 6;
    					stars.rotation.y = Math.random() * 6;
    					stars.rotation.z = Math.random() * 6;
    					stars.scale.setScalar( i * 10 );
    					stars.matrixAutoUpdate = false;
    					stars.updateMatrix();
    					scene.add( stars );
              //console.log(stars);
    				}
    				/*renderer = new THREE.WebGLRenderer( { antialias: true } );
    				renderer.setPixelRatio( window.devicePixelRatio );
    				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    				document.body.appendChild( renderer.domElement );*/

  window.addEventListener('resize', onWindowResize, false);
}



//Keep everything appearing properly on screen when window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //maintain aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function geometry(){


//create planet

  /*var map = new THREE.TextureLoader().load( 'js/moonsurface.jpg' );
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 16;*/

  var map2 = new THREE.TextureLoader().load( 'picture/sunsurface.jpg' );
  map2.wrapS = map2.wrapT = THREE.RepeatWrapping;
  map2.anisotropy = 16;

  var map3 = new THREE.TextureLoader().load( 'picture/mercury.jpg' );
  map3.wrapS = map3.wrapT = THREE.RepeatWrapping;
  map3.anisotropy = 16;

  var map4 = new THREE.TextureLoader().load( 'picture/venus.jpeg' );
  map4.wrapS = map4.wrapT = THREE.RepeatWrapping;
  map4.anisotropy = 16;

  var map5 = new THREE.TextureLoader().load( 'picture/mars.jpg' );
  map5.wrapS = map5.wrapT = THREE.RepeatWrapping;
  map5.anisotropy = 16;

  var map6 = new THREE.TextureLoader().load( 'picture/jupiter.jpg' );
  map6.wrapS = map6.wrapT = THREE.RepeatWrapping;
  map6.anisotropy = 16;

  var map7 = new THREE.TextureLoader().load( 'picture/saturn.jpg' );
  map7.wrapS = map7.wrapT = THREE.RepeatWrapping;
  map7.anisotropy = 16;

  var map8 = new THREE.TextureLoader().load( 'picture/uranus.jpg' );
  map8.wrapS = map8.wrapT = THREE.RepeatWrapping;
  map8.anisotropy = 16;

  var map9 = new THREE.TextureLoader().load( 'picture/neptune.jpg' );
  map9.wrapS = map9.wrapT = THREE.RepeatWrapping;
  map9.anisotropy = 16;

  /*var material = new THREE.MeshPhongMaterial( {  map: map, side: THREE.DoubleSide } );
  moon = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 20, 10 ), material );
	//moon.position.set( 10, 0, 0 );
	scene.add( moon );*/

  var material = new THREE.MeshPhongMaterial( {  map: map2, side: THREE.DoubleSide } );
  sun = new THREE.Mesh( new THREE.SphereBufferGeometry( 12, 20, 10 ), material );
  sun.position.set( 0, 0, 0 );
  scene.add( sun );

  var material = new THREE.MeshPhongMaterial( {  map: map3, side: THREE.DoubleSide } );
  mercury = new THREE.Mesh( new THREE.SphereBufferGeometry( 1.8, 20, 10 ), material );
  scene.add( mercury );

  var material = new THREE.MeshPhongMaterial( {  map: map4, side: THREE.DoubleSide } );
  venus = new THREE.Mesh( new THREE.SphereBufferGeometry( 2, 20, 10 ), material );
  scene.add( venus );

  var material = new THREE.MeshPhongMaterial( {  map: map5, side: THREE.DoubleSide } );
  mars = new THREE.Mesh( new THREE.SphereBufferGeometry( 2.5, 20, 10 ), material );
  scene.add( mars );

  var material = new THREE.MeshPhongMaterial( {  map: map6, side: THREE.DoubleSide } );
  jupiter = new THREE.Mesh( new THREE.SphereBufferGeometry( 6.5, 20, 10 ), material );
  scene.add( jupiter );

  var material = new THREE.MeshPhongMaterial( {  map: map7, side: THREE.DoubleSide } );
  saturn = new THREE.Mesh( new THREE.SphereBufferGeometry( 5.5, 20, 10 ), material );
  scene.add( saturn );

  var material = new THREE.MeshPhongMaterial( {  map: map8, side: THREE.DoubleSide } );
  uranus = new THREE.Mesh( new THREE.SphereBufferGeometry( 4, 20, 10 ), material );
  scene.add( uranus );

  var material = new THREE.MeshPhongMaterial( {  map: map9, side: THREE.DoubleSide } );
  neptune = new THREE.Mesh( new THREE.SphereBufferGeometry( 5, 20, 10 ), material );
  scene.add( neptune );
//create rings
  var geometry = new THREE.TorusGeometry( 20, 0.1, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff66 } );
  var torus = new THREE.Mesh( geometry, material );
  scene.add( torus );

  var geometry = new THREE.TorusGeometry( 40, 0.1, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff66 } );
  var torus2 = new THREE.Mesh( geometry, material );
  scene.add( torus2 );

  var geometry = new THREE.TorusGeometry( 60, 0.1, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff66 } );
  var torus3 = new THREE.Mesh( geometry, material );
  scene.add( torus3 );

  var geometry = new THREE.TorusGeometry( 80, 0.1, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff66 } );
  var torus4 = new THREE.Mesh( geometry, material );
  scene.add( torus4 );

  var geometry = new THREE.TorusGeometry( 100, 0.1, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff66 } );
  var torus5 = new THREE.Mesh( geometry, material );
  scene.add( torus5 );

  var geometry = new THREE.TorusGeometry( 120, 0.1, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff66 } );
  var torus6 = new THREE.Mesh( geometry, material );
  scene.add( torus6 );

  var geometry = new THREE.TorusGeometry( 140, 0.1, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff66 } );
  var torus7 = new THREE.Mesh( geometry, material );
  scene.add( torus7 );

  var geometry = new THREE.TorusGeometry( 160, 0.1, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff66 } );
  var torus8 = new THREE.Mesh( geometry, material );
  scene.add( torus8 );
  //Create the earth
  earth = new THREE.Object3D();
  scene.add(earth);

  loader = new THREE.OBJLoader();
  loader.load(
    'earth.obj',
    function (obj) {
      earth.add(obj)
    }
  )

  var mtlLoader = new THREE.MTLLoader()
  mtlLoader.load(
    'earth.mtl',
    function (material) {
      var objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(material)
      objLoader.load(
        'earth.obj',
        function (object) {
          earth.add(object);
        }
      )
    }
  )
}


// Render Loop
function animate(){
  requestAnimationFrame(animate);

   earth.rotation.x -= 0.0020;
   earth.rotation.y -= 0.0030;
   //moon.rotation.x -= 0.0020;
   //moon.rotation.y -= 0.0030;
   sun.rotation.x -= 0.0020;
   sun.rotation.y -= 0.0030;
   mercury.rotation.x -= 0.0020;
   mercury.rotation.y -= 0.0030;
   venus.rotation.x -= 0.0020;
   venus.rotation.y -= 0.0030;
   mars.rotation.x -= 0.0020;
   mars.rotation.y -= 0.0030;
   jupiter.rotation.x -= 0.0020;
   jupiter.rotation.y -= 0.0030;
   saturn.rotation.x -= 0.0020;
   saturn.rotation.y -= 0.0030;
   uranus.rotation.x -= 0.0020;
   uranus.rotation.y -= 0.0030;
   neptune.rotation.x -= 0.0020;
   neptune.rotation.y -= 0.0030;

   var time = Date.now() * 0.0005;
 	 var delta = clock.getDelta();

   var motionX = Math.sin( time * 0.45 ) * 60;
   var motionY = Math.cos( time * 0.45 ) * 60;

   earth.position.x = motionX;
	 earth.position.y = motionY;
   //moon.position.x = motionX + 5;
   //moon.position.y = motionY + 5;
   //moon.rotation.x = Math.sin( time * 0.15 ) ;
   //moon.rotation.x = Math.cos( time * 0.15 ) ;

   mercury.position.x = Math.sin( time * 0.50 ) * 20;
   mercury.position.y = Math.cos( time * 0.50 ) * 20;
   venus.position.x = Math.sin( time * 0.30 ) * 40;
   venus.position.y = Math.cos( time * 0.30 ) * 40;
   mars.position.x = Math.sin( time * 0.30 ) * 80;
   mars.position.y = Math.cos( time * 0.30 ) * 80;
   jupiter.position.x = Math.sin( time * 0.55 ) * 100;
   jupiter.position.y = Math.cos( time * 0.55 ) * 100;
   saturn.position.x = Math.sin( time * 0.60 ) * 120;
   saturn.position.y = Math.cos( time * 0.60 ) * 120;
   uranus.position.x = Math.sin( time * 0.75 ) * 140;
   uranus.position.y = Math.cos( time * 0.75 ) * 140;
   neptune.position.x = Math.sin( time * 0.65 ) * 160;
   neptune.position.y = Math.cos( time * 0.65 ) * 160;

   starField.rotation.x = time * 0.5;
   starField.rotation.y = time * 0.25;

	 //earth.position.z = Math.cos( time * 0.5 ) * 10;
  // Render the scene
  renderer.clear();
  renderer.render(scene, camera);

}
