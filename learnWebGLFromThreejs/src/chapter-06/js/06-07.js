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

    var font_bitstream;
    var font_helvetiker_bold;
    var font_helvetiker_regular;


    var fontload1 = new THREE.FontLoader();
    fontload1.load( '../../assets/fonts/bitstream_vera_sans_mono_roman.typeface.json', function ( response ) {
        controls.font = response;
        font_bitstream = response;
        controls.redraw();
        render();
    });

    var fontload2 = new THREE.FontLoader();
    fontload2.load( '../../assets/fonts/helvetiker_bold.typeface.json', function ( response ) {
        font_helvetiker_bold = response;
    });

    var fontload3 = new THREE.FontLoader();
    fontload3.load( '../../assets/fonts/helvetiker_regular.typeface.json', function ( response ) {
        font_helvetiker_regular = response;
    });


    let controls = new function () {
        this.appliedMaterial = applyMeshNormalMaterial
        this.castShadow = true;
        this.groundPlaneVisible = true;

        this.size = 50;
        this.height = 90;
        this.bevelThickness = 2;
        this.bevelSize = 0.5;
        this.bevelEnabled = true;
        this.bevelSegments = 3;
        this.bevelEnabled = true;
        this.curveSegments = 12;
        this.steps = 1;
        this.fontName = "bitstream vera sans mono";

        this.redraw = function () {
            switch (controls.fontName) {
                case 'bitstream vera sans mono':
                    controls.font = font_bitstream
                    break;
                case 'helvetiker':
                    controls.font = font_helvetiker_regular
                    break;
                case 'helvetiker bold':
                    controls.font = font_helvetiker_bold
                    break;
            }

            redrawGeometryAndUpdateUI(gui, scene, controls, function() {
                var options = {
                    size: controls.size,
                    height: controls.height,
                    weight: controls.weight,
                    font: controls.font,
                    bevelThickness: controls.bevelThickness,
                    bevelSize: controls.bevelSize,
                    bevelSegments: controls.bevelSegments,
                    bevelEnabled: controls.bevelEnabled,
                    curveSegments: controls.curveSegments,
                    steps: controls.steps
                };

                var geom = new THREE.TextGeometry("Learning Three.js", options)
                geom.scale(0.05,0.05,0.05);
                geom.center();

                return geom
            });
        };
    };

    let gui = new dat.GUI();
    gui.add(controls, 'size', 0, 200).onChange(controls.redraw);
    gui.add(controls, 'height', 0, 200).onChange(controls.redraw);
    gui.add(controls, 'fontName', ['bitstream vera sans mono', 'helvetiker', 'helvetiker bold']).onChange(controls.redraw);
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

    gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
    gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})

    let step = 0;

    function render() {
        stats.update();

        controls.mesh.rotation.y = step+=0.005
        controls.mesh.rotation.x = step
        controls.mesh.rotation.z = step

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
