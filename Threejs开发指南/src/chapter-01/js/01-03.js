function init() {
    console.log("Using Three js version:" + THREE.REVISION)

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;//阴影效果

    // createTree(scene); //添加绿色树对象
    // createHouse(scene);//添加蒙古包房子
    // createGroundPlane(scene);//地面绿色平面
    //  createBoudingWall(scene);//四周围墙

    var axes = new THREE.AxesHelper(20);//方向轴
    scene.add(axes);

    //添加正方体
    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        // wireframe: true
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;//设置为可投影，可是看不出投影效果
    cube.position.set(-4,2,0);
    scene.add(cube);//正方形

    //添加球体
    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777FF
    })
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20,4,2);
    sphere.castShadow = true;
    scene.add(sphere);

    //添加底板
    var planeGeometry = new THREE.PlaneGeometry(60,20);
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xAAAAAA
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15,0,0);
    plane.receiveShadow = true;
    scene.add(plane)

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40,40,-15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    scene.add(spotLight);
    
    var ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    // const dirLight = new THREE.DirectionalLight(0xffffff);
    // dirLight.position.set(-40,40,-15);
    // dirLight.castShadow = true;
    // dirLight.shadow.camera.top = 2;
    // dirLight.shadow.camera.bottom = -2;
    // dirLight.shadow.camera.left = -2;
    // dirLight.shadow.camera.right = 2;
    // dirLight.shadow.camera.near = 0.1
    // dirLight.shadow.camera.far = 40;
    // scene.add(dirLight)

    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    // hemiLight.position.set(0,20,0);
    // scene.add(hemiLight);

    document.getElementById("webgl-output").appendChild(renderer.domElement);
    renderer.render(scene, camera);
}

function createBoudingWall(scene) {
    var wallLeft = new THREE.BoxGeometry(70,2,2);
    var wallRight = new THREE.BoxGeometry(70, 2, 2);
    var wallTop = new THREE.BoxGeometry(2,2,50);
    var wallBottom = new THREE.BoxGeometry(2,2,50);

    var wallMaterial = new THREE.MeshLambertMaterial({
        color: 0xa0522d
    });

    var wallLeftMesh = new THREE.Mesh(wallLeft, wallMaterial);
    var wallRightMesh = new THREE.Mesh(wallRight, wallMaterial);
    var wallTopMesh = new THREE.Mesh(wallTop, wallMaterial);
    var wallBottomMesh = new THREE.Mesh(wallBottom, wallMaterial);

    wallLeftMesh.position.set(15,1,-25);
    wallRightMesh.position.set(15,1,25);
    wallTopMesh.position.set(-19,1,0);
    wallBottomMesh.position.set(49,1,0);

    scene.add(wallLeftMesh);
    scene.add(wallRightMesh);
    scene.add(wallBottomMesh);
    scene.add(wallTopMesh);
}

function createGroundPlane(scene) {
    var planeGeometry = new THREE.PlaneGeometry(70,50);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0x9acd32
    });
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane)
}

function createHouse(scene) {
    var roof = new THREE.ConeGeometry(5,4);
    var base = new THREE.CylinderGeometry(5,5,6);

    var roofMesh = new THREE.Mesh(roof, new THREE.MeshLambertMaterial({
        color: 0x8b7213
    }));

    var baseMesh = new THREE.Mesh(base, new THREE.MeshLambertMaterial({
        color: 0xffe4c4
    }))

    roofMesh.position.set(25, 8, 0);
    baseMesh.position.set(25, 3, 0);

    roofMesh.receiveShadow = true;
    baseMesh.receiveShadow = true;
    roofMesh.castShadow = true;
    baseMesh.castShadow = true;

    scene.add(roofMesh);
    scene.add(baseMesh);
}

//哈哈，这也能叫树
function createTree(scene) {
    var trunk = new THREE.BoxGeometry(1,8,1);
    var leaves = new THREE.SphereGeometry(4);

    var trunkMesh = new THREE.Mesh(trunk, new THREE.MeshLambertMaterial({
        color: 0x8b4513
    }));
    var leavesMesh = new THREE.Mesh(leaves, new THREE.MeshLambertMaterial({
        color: 0x00ff00
    }));

    trunkMesh.position.set(-10,4,0);
    trunkMesh.castShadow = true;
    trunkMesh.receiveShadow = true;

    leavesMesh.position.set(-10,4,0);
    leavesMesh.castShadow = true;
    leavesMesh.receiveShadow = true;

    scene.add(trunkMesh);
    scene.add(leavesMesh);
}
