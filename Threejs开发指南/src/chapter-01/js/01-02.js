function init() {
    console.log("Using Three js version:" + THREE.REVISION)

    var scene = new THREE.Scene(); //场景
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);//摄像机

    var renderer = new THREE.WebGLRenderer();//渲染器对象
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var axes = new THREE.AxesHelper(20);//添加轴
    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(60,20);
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xAAAAAA
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15,0,0);
    scene.add(plane)

    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: true
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4,3,0);
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777FF,
        wireframe: true
    })
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20,4,2);
    scene.add(sphere);

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
