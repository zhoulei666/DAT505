//Global variables
var renderer, scene, camera;
var loader;
var controls;
var starField
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
  document.getElementById('canvas').appendChild(renderer.domElement);
  //----------------------------------------------------------------------------

  /*var background = new THREE.CubeTextureLoader()
    .setPath( 'picture/' )
  	.load( [ 'sky1.jpg', 'sky2.jpg', 'sky3.jpg', 'sky4.jpg', 'sky5.jpg', 'sky6.jpg' ] );
  background.format = THREE.RGBFormat;
  background.size.
	scene = new THREE.Scene();
	scene.background = background; (this way to make background can't work with audio)*/
  // Create an empty scene
  scene = new THREE.Scene();
  //create background for scene
  var envMap = new THREE.CubeTextureLoader().load( [
      'picture/right.png', // right
      'picture/left.png', // left
      'picture/top.png', // top
      'picture/bottom.png', // bottom
      'picture/back.png', // back
      'picture/front.png' // front
    ] );
  envMap.format = THREE.RGBFormat;
  scene.background = envMap;
  scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0010 );

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 1, 10000);
  //Camera focuse on solar systerm
  camera.position.z = 200;
  camera.position.x = 60;
  camera.position.y = -500;
  //the way to control camera movement
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
  //create sun light by pointlight
  var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
  light = new THREE.PointLight( 0xffffff, 2, 500 );
  light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
  scene.add( light );
  var ambient = new THREE.AmbientLight(0xcccccc, 0.6);
  scene.add(ambient);

  //create stars by PointsMaterial
  var starsGeometry = new THREE.Geometry();
  //set number of stars
  for ( var i = 0; i < 10000; i ++ ) {
  //set star movement track
	var star = new THREE.Vector3();
	star.x = THREE.Math.randFloatSpread( 2000 );
	star.y = THREE.Math.randFloatSpread( 2000 );
	star.z = THREE.Math.randFloatSpread( 2000 );
	starsGeometry.vertices.push( star );
  }
  //set stars colour and size ,collect it as a nebula by starField
  var starsMaterial = new THREE.PointsMaterial( { size:2 ,sizeAttenuation: false,color: 0x999999 } );
  starField = new THREE.Points( starsGeometry, starsMaterial );
  scene.add( starField );
  //balance window size
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
  //load imgs of planet
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

  //set planet shape, size, material and surface
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

  //create rings for each planet
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
  //load obj file
  loader = new THREE.OBJLoader();
  loader.load(
  'earth.obj',
  function (obj) {
  earth.add(obj)
  }
  )
  //load mtl file
  var mtlLoader = new THREE.MTLLoader()
  mtlLoader.load(
  'earth.mtl',
  //set material
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
  //set planetary rotation
   earth.rotation.x -= 0.0020;
   earth.rotation.y -= 0.0030;
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
  //add time. that control the planet move speed
   var time = Date.now() * 0.0005;
 	 var delta = clock.getDelta();
  //set planet revolution
   earth.position.x = Math.sin( time * 0.45 ) * 60;
	 earth.position.y = Math.cos( time * 0.45 ) * 60;
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
  //set nebula(stars) movement
   starField.rotation.x = time * 0.5;
   starField.rotation.y = time * 0.25;

  renderer.clear();
  renderer.render(scene, camera);

}
