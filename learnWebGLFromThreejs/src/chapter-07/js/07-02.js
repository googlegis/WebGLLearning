function init() {

    // use the defaults
    let stats = initStats();
    let renderer = initRenderer()
    let camera = initCamera();
    let clock = new THREE.Clock();
    var trackballControls = initTrackballControls(camera, renderer);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 150;

    camera.lookAt(new THREE.Vector3(0,0,0));

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();

    createPoints();

    render();

    function createPoints() {
        var geom = new THREE.BufferGeometry();
        var vertices = [];
        var colors = [];

        var material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            color: 0xffffff
        });

        for (let x = -15; x < 15; x++) {
            for (let y = -10; y < 10; y++) {
                vertices.push(x*4, y*4, 0);
                let color = new THREE.Color(Math.random() * 0xffffff);
                colors.push(color.r);
                colors.push(color.g);
                colors.push(color.b);
            }
        }

        geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices,3));
        geom.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));

        var cloud = new THREE.Points(geom, material);
        scene.add(cloud);
    }

    function render() {
        stats.update();

        trackballControls.update(clock.getDelta());

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
