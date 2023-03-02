function init() {

  // use the defaults
  var stats = initStats();
  var renderer = initRenderer();
  var scene = new THREE.Scene();
  var camera = initCamera(new THREE.Vector3(0, 40, 50));

  camera.lookAt(scene.position);

  // call the render function
  var step = 0;

  var cubeMaterial = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.5
  });
  var controls = new function () {
    this.cameraNear = camera.near;
    this.cameraFar = camera.far;
    this.rotationSpeed = 0.02;
    this.combined = false;


    this.numberOfObjects = 500;

    this.redraw = function () {
      var toRemove = [];
      scene.traverse(function (e) {
        if (e instanceof THREE.Mesh) toRemove.push(e);
      });
      toRemove.forEach(function (e) {
        scene.remove(e)
      });

      // add a large number of cubes
      if (controls.combined) {
        // bufferGeometry 进行 merge后，各点的位置变了很小，不像随机分布，只有使用group才想，不过可能不是书中案例所说的 combined 成一个对象
        // var buffergeometry = new THREE.BufferGeometry();

        // var geoArray = []
        let group = new THREE.Group();

        for (var i = 0; i < controls.numberOfObjects; i++) {
          var cubeMesh = addcube();
          cubeMesh.updateMatrix();
          group.add(cubeMesh);
          //geoArray.push(cubeMesh.geometry);
        }

        //buffergeometry = THREE.BufferGeometryUtils.mergeBufferGeometries(geoArray, false);
        
        //scene.add(new THREE.Mesh(buffergeometry, cubeMaterial));
        scene.add(group);

      } else {
        for (var i = 0; i < controls.numberOfObjects; i++) {
          scene.add(controls.addCube());
        }
      }
    };


    this.addCube = addcube;

    this.outputObjects = function () {
      console.log(scene.children);
    }
  };

  var gui = new dat.GUI();

  gui.add(controls, 'numberOfObjects', 0, 20000);
  gui.add(controls, 'combined').onChange(controls.redraw);
  gui.add(controls, 'redraw');


  controls.redraw();

  render();

  var rotation = 0;

  function addcube() {

    var cubeSize = 1.0;
    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube randomly in the scene
    cube.position.x = -60 + Math.round((Math.random() * 100));
    cube.position.y = Math.round((Math.random() * 10));
    cube.position.z = -150 + Math.round((Math.random() * 175));

    // add the cube to the scene
    return cube;
  }

  function render() {

    rotation += 0.005;

    stats.update();

    camera.position.x = Math.sin(rotation) * 50;
    // camera.position.y = Math.sin(rotation) * 40;
    camera.position.z = Math.cos(rotation) * 50;
    camera.lookAt(scene.position);

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}