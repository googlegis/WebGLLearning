function init() {

    // use the defaults
    let stats = initStats();
    let renderer = initRenderer()
    let camera = initCamera();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();
    let groundPlane = addLargeGroundPlane(scene)
    groundPlane.position.y = -30;
    initDefaultLighting(scene);


    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.minDistance = 10;
    orbitControls.maxDistance = 500;

    let controls = new function () {
        this.appliedMaterial = applyMeshNormalMaterial;
        this.castShadow = true;
        this.groundPlaneVisible = true;

        this.radius = 5;
        this.height = 20;
        this.radialSegments = 32;
        this.heightSegments = 8;
        this.openEnded = false;
        this.thetaStart = 2 * Math.PI;
        this.thetaLength = 2 * Math.PI;

        // redraw function, updates the control UI and recreates the geometry.
        this.redraw = function () {
            redrawGeometryAndUpdateUI(gui,scene,controls, function () {
                return new THREE.ConeGeometry(controls.radius, controls.height,
                    controls.radialSegments, controls.heightSegments,
                    controls.openEnded, controls.thetaStart, controls.thetaLength);
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 30).onChange(controls.redraw);
    gui.add(controls, 'height', 0, 50).onChange(controls.redraw);
    gui.add(controls, 'radialSegments', 3, 64).step(1).onChange(controls.redraw);
    gui.add(controls, 'heightSegments', 1, 64).step(1).onChange(controls.redraw);
    gui.add(controls, 'openEnded').onChange(controls.redraw);
    gui.add(controls, 'thetaStart', 0, 2 * Math.PI).onChange(controls.redraw);
    gui.add(controls, 'thetaLength', 0, 2 * Math.PI).onChange(controls.redraw);
    gui.add(controls, 'appliedMaterial', {
        meshNormal: applyMeshNormalMaterial,
        meshStandard: applyMeshStandardMaterial
    }).onChange(controls.redraw)

    gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
    gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})

    controls.redraw();

    let step = 0;

    render();

    function render() {
        stats.update();

        controls.mesh.rotation.y = step += 0.01;
        controls.mesh.rotation.x = step;
        controls.mesh.rotation.z = step;

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
