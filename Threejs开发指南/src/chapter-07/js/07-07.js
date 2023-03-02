function init() {

    // use the defaults
    let stats = initStats();
    let renderer = initRenderer();

    let bufferGeometry;
    let velocitys;

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();
    
    let camera = initCamera(new THREE.Vector3(20,40,110));
    camera.lookAt(new THREE.Vector3(20,30,0));

    const counts = 1500;
    const range = 40;

    var controls = new function () {
        this.size = 3;
        this.transparent = true;
        this.opacity = 0.6;
        this.color = 0xffffff;

        this.sizeAttenuation = true;

        this.redraw = function () {

            scene.remove(scene.getObjectByName("particles1"));

            createGeometries(controls.size, controls.transparent, controls.opacity,
                controls.sizeAttenuation,controls.color);
        }
    }

    var gui = new dat.GUI();
    gui.add(controls, 'size', 0, 20).onChange(controls.redraw);
    gui.add(controls, 'transparent').onChange(controls.redraw);
    gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
    gui.addColor(controls, 'color').onChange(controls.redraw);
    gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);

    controls.redraw();

    setTimeout(function name(params) {
        animate();
    },1000);

    /**
     * 创建单个对象
     * @param {大小} size 
     * @param {*} transparent 
     * @param {*} opacity 
     * @param {*} sizeAttenuation 
     * @param {*} color 
     */
    function createGeometry(size, transparent, opacity, sizeAttenuation, color) {
        var texture = new THREE.TextureLoader().load("../../assets/textures/particles/raindrop-3.png");

        var material = new THREE.PointsMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            map: texture,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: sizeAttenuation,
            color: color
        });

        var positions = new Float32Array(counts * 3);

        velocitys = new Float32Array(counts * 3);

        for (var i = 0; i < counts; i ++) {

            const x = Math.random() * range - range / 2;
            const y = Math.random() * range * 1.5;
            const z = 1 + (i/100);

            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;


            velocitys[i * 3 + 0] =  (Math.random() - 0.5) / 3;
            velocitys[i * 3 + 1] = 0.1 + Math.random() / 5;
            velocitys[i * 3 + 2] = 0;
        }

        bufferGeometry = new THREE.BufferGeometry(); // r125 之后不能使用THREE.Geometry对象
        bufferGeometry.dynamic = true;
        bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions,3));
        bufferGeometry.computeBoundingSphere();
        
        mesh = new THREE.Points(bufferGeometry, material);
        mesh.name = "particles1";

        scene.add(mesh);        
    }

    //创建对象集
    function createGeometries(size, transparent, opacity, sizeAttenuation, color) {
        createGeometry(size, transparent, opacity, sizeAttenuation, color)
        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        
        requestAnimationFrame(animate);

        scene.children.forEach(function (child) {
            if(child instanceof THREE.Points) {
                var verticles = child.geometry.attributes.position.array;
                // verticles.forEach(function(v){
                //     console.log(v);
                // })

                for (var i = 0; i < counts; i ++) {

                    let x = verticles[i * 3 + 0];
                    let y = verticles[i * 3 + 1];
                    
                    let stepx = velocitys[i * 3 + 0];
                    let stepy = velocitys[i * 3 + 1];
        
                    verticles[i * 3 + 0] = x - stepx;
                    verticles[i * 3 + 1] = y - stepy;
        
                    if(verticles[i * 3 + 1] <= 0)  {
                        verticles[i * 3 + 1] = 60
                    }
        
                    if(verticles[i * 3 + 0] <= -20 || verticles[i * 3 + 0] >= 20) {
                        velocitys[i * 3 + 0] = velocitys[i * 3 + 0] * -1;
                    }
                }
            }
        })

        bufferGeometry.attributes.position.needsUpdate = true;

        // bufferGeometry.attributes.color.needsUpdate = true;
        bufferGeometry.computeBoundingSphere();
        
        renderer.render(scene, camera);

        stats.update();        
    }
}
