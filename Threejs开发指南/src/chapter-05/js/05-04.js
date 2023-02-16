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

        this.redraw = function () {
            redrawGeometryAndUpdateUI(gui,scene,controls, function () {
                return new THREE.ShapeGeometry(drawShape(), self.curveSegments).center();
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls, 'curveSegments', 0, 100).onChange(controls.redraw);
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

function drawShape() {
    
    let shape = new THREE.Shape();
    shape.moveTo(10,10);
    shape.lineTo(10,40);
    shape.bezierCurveTo(15,25,25,25,30,40);

    shape.splineThru(
        [
            new THREE.Vector2(32,30),
            new THREE.Vector2(28,20),
            new THREE.Vector2(30,10),
        ]);
    shape.quadraticCurveTo(20,15,10,10);

    let hole1 = new THREE.Path();
    hole1.absellipse(16,24,2,3,0,Math.PI * 2, true);
    shape.holes.push(hole1);

    let hole2 = new THREE.Path();
    hole2.absellipse(23,24,2,3,0, Math.PI * 2, true);
    shape.holes.push(hole2);

    let hole3 = new THREE.Path();
    hole3.absarc(20,16,2,0, Math.PI,true);
    shape.holes.push(hole3);

    return shape;
}
