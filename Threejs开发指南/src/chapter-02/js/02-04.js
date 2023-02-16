function init() {

    console.log("Using Three js version:" + THREE.REVISION)

    const stats = initStats();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const planeGeometry = new THREE.PlaneGeometry(60,40,1,1,);
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    camera.position.x = -50;
    camera.position.y = 30;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(-10,0,0));

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, Math.PI/4, 0, 2);
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.position.set(-40,30,30);
    spotLight.castShadow = true;
    scene.add(spotLight);

    addGeometries(scene);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    const step = 0;

    function addGeometries(scene) {
        var geoms = [];
        geoms.push(new THREE.CylinderGeometry(1, 4, 4));
        geoms.push(new THREE.BoxGeometry(2, 2, 2));
        geoms.push(new THREE.SphereGeometry(2));
        geoms.push(new THREE.IcosahedronGeometry(4));

        var points = [
            new THREE.Vector3(2,2,2),
            new THREE.Vector3(2,2,-2),
            new THREE.Vector3(-2,2,-2),
            new THREE.Vector3(-2,2,2),
            new THREE.Vector3(2,-2,2),
            new THREE.Vector3(2,-2,-2),
            new THREE.Vector3(-2,-2,-2),
            new THREE.Vector3(-2,-2,2)
        ];
        geoms.push(new THREE.ConvexGeometry(points));

        var pts = [];
        var detail = .1;
        var radius = 3;
        for(var angle = 0.0; angle < Math.PI; angle += detail) {
            pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
        }
        geoms.push(new THREE.LatheGeometry(pts,12));

        geoms.push(new THREE.OctahedronGeometry(3));
        geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d,20,10));

        geoms.push(new THREE.TetrahedronGeometry(3));
        geoms.push(new THREE.TorusGeometry(3,1,10,10));
        geoms.push(new THREE.TorusKnotGeometry(3,0.5,50,20));

        var j = 0;
        for(var i = 0; i < geoms.length; i++) {
            var cubeMaterial = new THREE.MeshLambertMaterial({
                wireframe: true,
                color: Math.random() * 0xffffff
            });

            var materials = [
              new THREE.MeshLambertMaterial({
                  color: Math.random() * 0xffffff
              }),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    wireframe: true
                })
            ];

            var mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials);
            mesh.traverse(function (e) {
                e.castShadow = true
            });

            mesh.position.x = -24 + ((i % 4) * 12);
            mesh.position.y = 4;
            mesh.position.z = -8 + (j * 12);

            if((i+1) % 4 == 0) j++;
            scene.add(mesh);
        }
    }

    const trackballControls = initTrackballControls(camera, renderer);
    const clock = new THREE.Clock();

    render();

    function render() {
        trackballControls.update(clock.getDelta());
        stats.update();

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
