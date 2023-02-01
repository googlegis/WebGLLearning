function init() {

    console.log("Using Three js version:" + THREE.REVISION)

    const stats = initStats();

    const scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 120;
    camera.position.y = 60;
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const planeGeometry = new THREE.PlaneGeometry(180,180);
    const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

    for (var j = 0; j < (planeGeometry.parameters.height / 5); j++) {
        for (var i = 0; i < planeGeometry.parameters.width / 5; i++) {
            var rnd = Math.random() * 0.75 + 0.25;
            var cubeMaterial = new THREE.MeshLambertMaterial();
            cubeMaterial.color = new THREE.Color(rnd, 0, 0);
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

            cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);
            cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
            cube.position.y = 2;

            scene.add(cube);
        }
    }

    var lookAtGeom = new THREE.SphereGeometry(2);
    var lookAtMesh = new THREE.Mesh(lookAtGeom, new THREE.MeshLambertMaterial({color: 0x00ff00}));
    scene.add(lookAtMesh);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-20, 40, 60);
    scene.add(directionalLight);

    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x292929);
    scene.add(ambientLight);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    var step = 0;
    var controls = new function () {
        this.perspective = "Perspective";
        this.switchCamera = function () {
            if (camera instanceof THREE.PerspectiveCamera) {
                camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
                camera.position.x = 120;
                camera.position.y = 60;
                camera.position.z = 180;

                camera.lookAt(scene.position);
                this.perspective = "Orthographic";
            } else {
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.x = 120;
                camera.position.y = 60;
                camera.position.z = 180;

                camera.lookAt(scene.position);
                this.perspective = "Perspective";
            }
        };
    };

    var gui = new dat.GUI();
    gui.add(controls, 'switchCamera');
    gui.add(controls, 'perspective').listen();

    render();

    function render() {
        stats.update();
        step += 0.02;
        if (camera instanceof THREE.Camera) {
            var x = 10 + ( 100 * (Math.sin(step)));
            camera.lookAt(new THREE.Vector3(x, 10, 0));
            lookAtMesh.position.copy(new THREE.Vector3(x, 10, 0));
        }

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
