
import { VRMLLoader } from "../../../libs/three/loaders/VRMLLoader.js";

function init() {

  // setup the scene for rendering
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  var loaderScene = new BaseLoaderScene(camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var loader = new VRMLLoader();
  loader.load("../../assets/models/tree/tree.wrl", function (model) {
      model.scale.set(10, 10, 10);
      loaderScene.add(model);
      //loaderScene.render(model, camera);
  });
}