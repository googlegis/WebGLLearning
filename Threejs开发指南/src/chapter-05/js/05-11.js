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

    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.minDistance = 10;
    orbitControls.maxDistance = 500;

    let controls = new function () {
        this.appliedMaterial = applyMeshNormalMaterial;
        this.castShadow = true;
        this.groundPlaneVisible = true;

        this.radius = 10;
        this.detail = 0;
        this.type = 'Icosahedron';

        // redraw function, updates the control UI and recreates the geometry.
        this.redraw = function () {
            redrawGeometryAndUpdateUI(gui, scene, controls, function() {
                let polyhedron;
                switch (controls.type) {
                    case 'Icosahedron':
                        polyhedron = new THREE.IcosahedronGeometry(controls.radius, controls.detail);
                        break;
                    case 'Tetrahedron':
                        polyhedron = new THREE.TetrahedronGeometry(controls.radius, controls.detail);
                        break;
                    case 'Octahedron':
                        polyhedron = new THREE.OctahedronGeometry(controls.radius, controls.detail);
                        break;
                    case 'Dodecahedron':
                        polyhedron = new THREE.DodecahedronGeometry(controls.radius, controls.detail);
                        break;
                    case 'Custom':
                        let vertices = [
                            1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1
                        ];

                        let indices = [
                            2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
                        ];

                        polyhedron = new THREE.PolyhedronGeometry(vertices, indices, controls.radius, controls.detail);
                        break;
                }

                return polyhedron
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 40).step(1).onChange(controls.redraw);
    gui.add(controls, 'detail', 0, 3).step(1).onChange(controls.redraw);
    gui.add(controls, 'type', ['Icosahedron', 'Tetrahedron', 'Octahedron', 'Dodecahedron', 'Custom']).onChange(controls.redraw);

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
