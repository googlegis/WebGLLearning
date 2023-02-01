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

        let baseGeom = new THREE.TorusKnotGeometry();

        this.radius = baseGeom.parameters.radius ? baseGeom.parameters.radius : 1;
        this.tube = 0.3;
        this.radialSegments = baseGeom.parameters.radialSegments ? baseGeom.parameters.radialSegments : 8;
        this.tubularSegments = baseGeom.parameters.tubularSegments ? baseGeom.parameters.tubularSegments : 64;
        this.p = 2;
        this.q = 3;

        // redraw function, updates the control UI and recreates the geometry.
        this.redraw = function () {
            redrawGeometryAndUpdateUI(gui, scene, controls, function() {
                return new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(
                    controls.tubularSegments), Math.round(controls.radialSegments), Math.round(
                    controls.p), Math.round(controls.q))
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'tube', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'radialSegments', 0, 400).step(1).onChange(controls.redraw);
    gui.add(controls, 'tubularSegments', 1, 200).step(1).onChange(controls.redraw);
    gui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
    gui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);

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
