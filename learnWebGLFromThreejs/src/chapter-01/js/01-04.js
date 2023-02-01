function init() {

    console.log("Using Three js version:" + THREE.REVISION)

    var stats = initStats();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var planeGeometry = new THREE.PlaneGeometry(60,20, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane)

    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFF0000
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    cube.position.x = -4;
    cube.position.y = 4;
    cube.position.z = 0;
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777FF
    })
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20,0,2);
    sphere.castShadow = true;
    scene.add(sphere);


    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    var ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-10,20,-5);
    spotLight.castShadow = true;
    // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    // spotLight.shadow.camera.far = 130;
    // spotLight.shadow.camera.near = 40;
    scene.add(spotLight);

    // const dirLight = new THREE.DirectionalLight(0xffffff);
    // dirLight.position.set(-40,40,-15);
    // dirLight.castShadow = true;
    // dirLight.shadow.camera.top = 2;
    // dirLight.shadow.camera.bottom = -2;
    // dirLight.shadow.camera.left = -2;
    // dirLight.shadow.camera.right = 2;
    // dirLight.shadow.camera.near = 0.1
    // dirLight.shadow.camera.far = 40;
    // scene.add(dirLight)

    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    // hemiLight.position.set(0,20,0);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    var step = 0;
    renderScene();

    function renderScene() {

        stats.update();

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;

        step += 0.04;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera);
    }
}
