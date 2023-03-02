function init() {

    // use the defaults
    let stats = initStats();
    let renderer = initRenderer();

    let velocitys = [];

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();
    
    let camera = initCamera(new THREE.Vector3(20,40,110));
    camera.lookAt(new THREE.Vector3(20,30,0));

    const counts = 150;
    const range = 40;

    var controls = new function () {
        this.size = 10;
        this.transparent = true;
        this.opacity = 0.6;
        this.color = 0xffffff;

        this.sizeAttenuation = true;

        this.redraw = function () {

            var toRemove =[];

            scene.children.forEach(function (child) {
                if(child instanceof THREE.Points) {
                    toRemove.push(child)
                }
            })

            toRemove.forEach(function (child) {
                scene.remove(child);
            })

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
    function createGeometry(name, texture, size, transparent, opacity, sizeAttenuation, color) {
        
        var color1 = new THREE.Color(color);
        var color2 = {} ;

        color1.getHSL(color2)
        console.log(color2);
        
        color1.setHSL(color2.h, color2.s, (Math.random()) * color2.l);
        
        //color1.setHSL(0, 0, 0);

        var material = new THREE.PointsMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            map: texture,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: sizeAttenuation,
            color: color1
        });

        var positions = new Float32Array(counts * 3);

        let velocity = new Float32Array(counts * 3);

        for (var i = 0; i < counts; i ++) {

            const x = Math.random() * range - range / 2;
            const y = Math.random() * range * 1.5;
            const z = 1 + (i/100);

            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;


            velocity[i * 3 + 0] = (Math.random() - 0.5) / 3;
            velocity[i * 3 + 1] = 0.1 + Math.random() / 5;
            velocity[i * 3 + 2] = (Math.random() - 0.5) / 3;
        }

        velocitys.push({
            name: name,
            data: velocity
        })

        let bufferGeometry = new THREE.BufferGeometry(); // r125 之后不能使用THREE.Geometry对象
        bufferGeometry.dynamic = true;
        bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions,3));
        bufferGeometry.computeBoundingSphere();
        
        let mesh = new THREE.Points(bufferGeometry, material);
        mesh.name = name;

        scene.add(mesh);        
    }

    //创建对象集
    function createGeometries(size, transparent, opacity, sizeAttenuation, color) {
        velocitys = []; //重置
        var loader = new THREE.TextureLoader();

        var texture1 = loader.load("../../assets/textures/particles/snowflake1_t.png");
        var texture2 = loader.load("../../assets/textures/particles/snowflake2_t.png");
        var texture3 = loader.load("../../assets/textures/particles/snowflake3_t.png");
        var texture4 = loader.load("../../assets/textures/particles/snowflake5_t.png");
    
        createGeometry("system1", texture1, size, transparent, opacity, sizeAttenuation, color);
        createGeometry("system2", texture2, size, transparent, opacity, sizeAttenuation, color);
        createGeometry("system3", texture3, size, transparent, opacity, sizeAttenuation, color);
        createGeometry("system4", texture4, size, transparent, opacity, sizeAttenuation, color);
 
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
                
                const name = child.name;

                for(let k =0; k < velocitys.length;k++) {
                    let name1 = velocitys[k].name;

                    if(name1 == name) {
                        
                        var velocity = velocitys[k].data;

                        var verticles = child.geometry.attributes.position.array;
 
                        for (var i = 0; i < counts; i ++) {
        
                            let x = verticles[i * 3 + 0];
                            let y = verticles[i * 3 + 1];
                            let z = verticles[i * 3 + 2];
                            
                            let stepx = velocity[i * 3 + 0];
                            let stepy = velocity[i * 3 + 1];
                            let stepz = velocity[i * 3 + 2];
                
                            verticles[i * 3 + 0] = x - stepx;
                            verticles[i * 3 + 1] = y - stepy;
                            verticles[i * 3 + 2] = z -stepz;
                
                            if(verticles[i * 3 + 1] <= 0)  {
                                verticles[i * 3 + 1] = 60
                            }
                
                            if(verticles[i * 3 + 0] <= -20 || verticles[i * 3 + 0] >= 20) {
                                velocity[i * 3 + 0] = velocity[i * 3 + 0] * -1;
                            }
        
                            if(verticles[i * 3 + 2] <= -20 || verticles[i * 3 + 2] >= 20) {
                                velocity[i * 3 + 2] = velocity[i * 3 + 2] * -1;
                            }
                        }
                    }
                }
                child.geometry.attributes.position.needsUpdate = true;

                child.geometry.computeBoundingSphere();
            }
        })       
        
        renderer.render(scene, camera);

        stats.update();        
    }
}
