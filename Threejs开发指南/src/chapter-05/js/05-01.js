function init() {

    // use the defaults
    let stats = initStats();
    let renderer = initRenderer()
    let camera = initCamera();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();
    let groundPlane = addLargeGroundPlane(scene)
    groundPlane.position.y = -10;
    initDefaultLighting(scene);

    let controls = new function () {
        let self = this;

        this.appliedMaterial = applyMeshNormalMaterial;
        this.castShadow = true;
        this.groundPlaneVisible = true;

        this.planeGeometry = new THREE.PlaneGeometry(20,20,4,4);
        this.width = this.planeGeometry.parameters.width;
        this.height = this.planeGeometry.parameters.height;
        this.widthSegments = this.planeGeometry.parameters.widthSegments;
        this.heightSegments = this.planeGeometry.parameters.heightSegments;

        this.redraw = function () {
            redrawGeometryAndUpdateUI(gui,scene,controls, function () {
                return new THREE.PlaneGeometry(controls.width, controls.height, Math.round(controls.widthSegments), Math.round(controls.heightSegments));
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls,'width',0,40).onChange(controls.redraw);
    gui.add(controls,'height',0,40).onChange(controls.redraw);
    gui.add(controls,'widthSegments').onChange(controls.redraw);
    gui.add(controls, 'heightSegments').onChange(controls.redraw);
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
