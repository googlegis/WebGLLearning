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

        this.innerRadius = 3;
        this.outerRadius = 10;
        this.thetaSegments = 8;
        this.phiSegments = 8;
        this.thetaStart = 0;
        this.thetaLength = Math.PI * 2;

        this.redraw = function () {
            redrawGeometryAndUpdateUI(gui,scene,controls, function () {
                return new THREE.RingGeometry(controls.innerRadius,controls.outerRadius,controls.thetaSegments,
                    controls.phiSegments,controls.thetaStart,controls.thetaLength);
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls, 'innerRadius', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'outerRadius', 0, 100).onChange(controls.redraw);
    gui.add(controls, 'thetaSegments', 1, 40).step(1).onChange(controls.redraw);
    gui.add(controls, 'phiSegments', 1, 20).step(1).onChange(controls.redraw);
    gui.add(controls, 'thetaStart', 0, Math.PI * 2).onChange(controls.redraw);
    gui.add(controls, 'thetaLength', 0, Math.PI * 2).onChange(controls.redraw);
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
