function init() {

    // use the defaults
    let stats = initStats();
    let camera = initCamera(new THREE.Vector3(20,0,150));
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();
    let webGLRenderer = initRenderer();

    createSprites();
    render();

    let step = 0;

    function createSprites() {
        let material = new THREE.SpriteMaterial({
            map: createGhostTexture(),
            color: 0xffffff
        });

        var range = 500;
        for(var i = 0; i< 1500; i++) {
            var sprite = new THREE.Sprite(material);
            sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() *
                range - range / 2);
            sprite.scale.set(4, 4, 4);
            scene.add(sprite);
        }
    }

    function render() {
        stats.update();

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }
}
