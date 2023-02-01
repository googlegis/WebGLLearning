    let stats ;
    let camera;
    let scene;
    let render;

    function init() {

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animation);
        renderer.outputEncoding = THREE.sRGBEncoding;
        document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 5, -15);

        scene = new THREE.Scene();

        THREE.RectAreaLightUniformsLib.init();

        const rectLight1 = new THREE.RectAreaLight(0xff0000, 5, 4, 10);
        rectLight1.position.set(-5, 5, 5);
        scene.add(rectLight1);

        const rectLight2 = new THREE.RectAreaLight(0x00ff00, 5, 4, 10);
        rectLight2.position.set(0, 5, 5);
        scene.add(rectLight2);

        const rectLight3 = new THREE.RectAreaLight(0x0000ff, 5, 4, 10);
        rectLight3.position.set(5, 5, 5);
        scene.add(rectLight3);

        scene.add(new THREE.RectAreaLightHelper(rectLight1));
        scene.add(new THREE.RectAreaLightHelper(rectLight2));
        scene.add(new THREE.RectAreaLightHelper(rectLight3));

        const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
        const matStdFloor = new THREE.MeshStandardMaterial({color: 0x808080, roughness: 0.1, metalness: 0});
        const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
        scene.add(mshStdFloor);

        const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
        const matKnot = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0, metalness: 0});
        const meshKnot = new THREE.Mesh(geoKnot, matKnot);
        meshKnot.name = 'meshKnot';
        meshKnot.position.set(0, 5, 0);
        scene.add(meshKnot);


        const controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.target.copy( meshKnot.position );
        controls.update();

        window.addEventListener( 'resize', onWindowResize );

        stats = new Stats();
        document.body.appendChild( stats.dom );
    }

    function onWindowResize() {

        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = ( window.innerWidth / window.innerHeight );
        camera.updateProjectionMatrix();

    }

    function animation( time ) {

        const mesh = scene.getObjectByName( 'meshKnot' );
        mesh.rotation.y = time / 1000;

        renderer.render( scene, camera );

        stats.update();

    }

//
//
// var controls = new function () {
//     this.rotationSpeed = 0.02;
//     this.color1 = 0xff0000;
//     this.intensity1 = 500;
//     this.color2 = 0x00ff00;
//     this.intensity2 = 500;
//     this.color3 = 0x0000ff;
//     this.intensity3 = 500;
// };

    // var gui = new dat.GUI();
    // gui.addColor(controls, 'color1').onChange(function (e) {
    //     areaLight1.color = new THREE.Color(e);
    //     planeGeometry1Mat.color = new THREE.Color(e);
    //     scene.remove(plane1);
    //     plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
    //     plane1.position.copy(areaLight1.position);
    //     scene.add(plane1);
    //
    // });
    // gui.add(controls, 'intensity1', 0, 1000).onChange(function (e) {
    //     areaLight1.intensity = e;
    // });
    // gui.addColor(controls, 'color2').onChange(function (e) {
    //     areaLight2.color = new THREE.Color(e);
    //     planeGeometry2Mat.color = new THREE.Color(e);
    //     scene.remove(plane2);
    //     plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);
    //     plane2.position.copy(areaLight2.position);
    //     scene.add(plane2);
    // });
    // gui.add(controls, 'intensity2', 0, 1000).onChange(function (e) {
    //     areaLight2.intensity = e;
    // });
    // gui.addColor(controls, 'color3').onChange(function (e) {
    //     areaLight3.color = new THREE.Color(e);
    //     planeGeometry3Mat.color = new THREE.Color(e);
    //     scene.remove(plane3);
    //     plane3 = new THREE.Mesh(planeGeometry1, planeGeometry3Mat);
    //     plane3.position.copy(areaLight3.position);
    //     scene.add(plane3);
    // });
    // gui.add(controls, 'intensity3', 0, 1000).onChange(function (e) {
    //     areaLight3.intensity = e;
    // });
    //
    //
    // render();
    //
    // function render() {
    //     stats.update();
    //     trackballControls.update(clock.getDelta());
    //
    //     // render using requestAnimationFrame
    //     requestAnimationFrame(render);
    //     renderer.render(scene, camera);
    // }

