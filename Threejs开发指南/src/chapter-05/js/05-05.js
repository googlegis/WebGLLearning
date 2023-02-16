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

    let controls = new function () {
        let self = this;
        this.curveSegments = 12;

        this.appliedMaterial = applyMeshNormalMaterial;
        this.castShadow = true;
        this.groundPlaneVisible = true;

        let baseGeom = new THREE.BoxGeometry(4, 10, 10, 4, 4, 4);
        this.width = baseGeom.parameters.width;
        this.height = baseGeom.parameters.height;
        this.depth = baseGeom.parameters.depth;

        this.widthSegments = baseGeom.parameters.widthSegments;
        this.heightSegments = baseGeom.parameters.heightSegments;
        this.depthSegments = baseGeom.parameters.depthSegments;

        // redraw function, updates the control UI and recreates the geometry.
        this.redraw = function () {
            redrawGeometryAndUpdateUI(gui,scene,controls, function () {
                return new THREE.BoxGeometry(controls.width, controls.height, controls.depth, Math.round(
                    controls.widthSegments), Math.round(controls.heightSegments), Math.round(
                    controls.depthSegments));
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls, 'width', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'height', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'depth', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'widthSegments', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'heightSegments', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'depthSegments', 0, 10).onChange(controls.redraw);
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
