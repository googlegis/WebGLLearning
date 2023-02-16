function init() {

    // use the defaults
    let stats = initStats();
    let renderer = initRenderer()
    let camera = initCamera();
    let clock = new THREE.Clock();
    var trackballControls = initTrackballControls(camera, renderer);

    camera.position.x = 20;
    camera.position.y = 0;
    camera.position.z = 150;

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();

    var cloud;

    var controls = new function () {
        this.size = 4;
        this.transparent = true;
        this.opacity = 0.6;
        this.vertexColors = true;
        this.color = 0xffffff;
        this.vertexColor = 0x00ff00;
        this.sizeAttenuation = true;
        this.rotate = true;

        this.redraw = function () {
            console.log(controls.color)

            if(scene.getObjectByName("particles")) {
                scene.remove(scene.getObjectByName("particles"));
            }

            createParticles(controls.size,controls.transparent,controls.opacity,controls.vertexColors,
                controls.sizeAttenuation, controls.color, controls.vertexColor);
        };
    };

    var gui = new dat.GUI();
    gui.add(controls, 'size', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'transparent').onChange(controls.redraw);
    gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
    gui.add(controls, 'vertexColors').onChange(controls.redraw);

    gui.addColor(controls, 'color').onChange(controls.redraw);
    gui.addColor(controls, 'vertexColor').onChange(controls.redraw);
    gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);
    gui.add(controls, 'rotate');

    controls.redraw();

    render();

    function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, colorValue, vertexColorValue) {

        var geom = new THREE.BufferGeometry();

        var material = new THREE.PointsMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            vertexColors: vertexColors,

            sizeAttenuation: sizeAttenuation,
            color: new THREE.Color(colorValue)
        });

        var vertices = [];
        var colors = [];

        var range = 500;
        for (var i = 0; i < 15000; i++) {
            vertices.push(Math.random() * range - range / 2);
            vertices.push(Math.random() * range - range / 2);
            vertices.push(Math.random() * range - range / 2);

            var color = new THREE.Color(vertexColorValue);
            var asHSL = {};
            color.getHSL(asHSL);
            color.setHSL(asHSL.h, asHSL.s, asHSL.l * Math.random());
            colors.push(color.r);
            colors.push(color.g);
            colors.push(color.b);
        }

        geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices,3));
        geom.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));

        cloud = new THREE.Points(geom, material);
        cloud.name = "particles";
        scene.add(cloud);
    }

    var step = 0;

    function render() {
        stats.update();

        trackballControls.update(clock.getDelta());

        if(controls.rotate) {
            step += 0.01;
            cloud.rotation.x = step;
            cloud.rotation.z = step;
        }

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
