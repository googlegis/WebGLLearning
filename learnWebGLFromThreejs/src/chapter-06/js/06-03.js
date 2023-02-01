function init() {

    // use the defaults
    let stats = initStats();
    let renderer = initRenderer()
    let camera = initCamera();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();
    initDefaultLighting(scene);

    let groundPlane = addLargeGroundPlane(scene)
    groundPlane.position.y = -30;

    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.minDistance = 10;
    orbitControls.maxDistance = 500;

    let controls = new function () {
        this.appliedMaterial = applyMeshNormalMaterial
        this.castShadow = true;
        this.groundPlaneVisible = true;

        this.amount = 2;
        this.bevelThickness = 2;
        this.bevelSize = 0.5;
        this.bevelEnabled = true;
        this.bevelSegments = 3;
        this.bevelEnabled = true;
        this.curveSegments = 12;
        this.steps = 1;

        this.redraw = function () {
            redrawGeometryAndUpdateUI(gui, scene, controls, function() {
                let options = {
                    amount: controls.amount,
                    bevelThickness: controls.bevelThickness,
                    bevelSize: controls.bevelSize,
                    bevelSegments: controls.bevelSegments,
                    bevelEnabled: controls.bevelEnabled,
                    curveSegments: controls.curveSegments,
                    steps: controls.steps
                };

                let geom = new THREE.ExtrudeGeometry(drawShape(), options);
                //geom.applyMatrix(new THREE.Matrix4().makeTranslation(-20, 0, 0));
                // geom.applyMatrix(new THREE.Matrix4().makeScale(0.4,0.4,0.4));
                return geom
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls, 'amount', 0, 20).onChange(controls.redraw);
    gui.add(controls, 'bevelThickness', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'bevelSize', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'bevelSegments', 0, 30).step(1).onChange(controls.redraw);
    gui.add(controls, 'bevelEnabled').onChange(controls.redraw);
    gui.add(controls, 'curveSegments', 1, 30).step(1).onChange(controls.redraw);
    gui.add(controls, 'steps', 1, 5).step(1).onChange(controls.redraw);

    gui.add(controls, 'appliedMaterial', {
        meshNormal: applyMeshNormalMaterial,
        meshStandard: applyMeshStandardMaterial
    }).onChange(controls.redraw)

    gui.add(controls,'redraw');
    gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
    gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})

    controls.redraw();

    let step = 0;

    render();

    function render() {
        stats.update();

        controls.mesh.rotation.y = step += 0.005;
        controls.mesh.rotation.x = step;
        controls.mesh.rotation.z = step;

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function drawShape() {

        // create a basic shape
        let shape = new THREE.Shape();

        // startpoint
        shape.moveTo(10, 10);

        // straight line upwards
        shape.lineTo(10, 40);

        // the top of the figure, curve to the right
        shape.bezierCurveTo(15, 25, 25, 25, 30, 40);

        // spline back down
        shape.splineThru(
            [new THREE.Vector2(32, 30),
                new THREE.Vector2(28, 20),
                new THREE.Vector2(30, 10),
            ]);

        // curve at the bottom
        shape.quadraticCurveTo(20, 15, 10, 10);

        // add 'eye' hole one
        let hole1 = new THREE.Path();
        hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true);
        shape.holes.push(hole1);

        // add 'eye hole 2'
        let hole2 = new THREE.Path();
        hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true);
        shape.holes.push(hole2);

        // add 'mouth'
        let hole3 = new THREE.Path();
        hole3.absarc(20, 16, 2, 0, Math.PI, true);
        shape.holes.push(hole3);

        // return the shape
        return shape;
    }

}
