function init() {

    // use the defaults
    var stats = initStats();
    var renderer = initRenderer()
    var camera = initCamera();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    var points = gosper(4,60);

    var lines = new THREE.BufferGeometry();

    var colors = [];
    var positions = [];
    var i =0;
    var color = new THREE.Color();
    points.forEach(function (e) {
        positions.push(e.x);
        positions.push(e.y);
        positions.push(e.z);

        console.log(e);
        color = new THREE.Color(0xffffff);
        color.setHSL(e.x/100+0.5, (e.y * 20)/300, 0.8);
        colors.push(color.r);
        colors.push(color.g);
        colors.push(color.b);
        i++;
    });

    lines.setAttribute('position',new THREE.Float32BufferAttribute( positions, 3 ));
    lines.setAttribute('color',new THREE.Float32BufferAttribute( colors, 3 ));

    var material = new THREE.LineBasicMaterial({
        opacity: 1.0,
        linewidth: 1,
        vertexColors: true
    });

    var line = new THREE.Line(lines,material);
    line.computeLineDistances();
    line.position.set(25, -30, -60);
    line.scale.set(1,1,1);
    scene.add(line);



   // 第二种方法

    const positions2 = [];
    const colors2 = [];

    const points2 = THREE.GeometryUtils.hilbert3D( new THREE.Vector3( 0, 0, 0 ), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );

    const spline2 = new THREE.CatmullRomCurve3( points2 );
    const divisions2 = Math.round( 12 * points2.length );
    const point2 = new THREE.Vector3();
    const color2 = new THREE.Color();

    for ( let i = 0, l = divisions2; i < l; i ++ ) {

        const t = i / l;

        spline2.getPoint( t, point2 );
        positions2.push( point2.x, point2.y, point2.z );

        color2.setHSL( t, 1.0, 0.5 );
        colors2.push( color2.r, color2.g, color2.b );

    }

    const geometry2 = new THREE.LineGeometry();
    geometry2.setPositions( positions2 );
    geometry2.setColors( colors2 );

    var matLine2 = new THREE.LineMaterial( {

        color: 0xffffff,
        linewidth: 5, // in world units with size attenuation, pixels otherwise
        vertexColors: true,

        //resolution:  // to be set by renderer, eventually
        dashed: false,
        alphaToCoverage: true,

    } );

    var line2 = new THREE.Line2( geometry2, matLine2 );
    line2.computeLineDistances();
    //line2.scale.set( 1, 1, 1 );
    //scene.add( line2 );
    // 第二种方法结束


    // call the render function
    var step = 0;

    render();

    function render() {
        stats.update();

        line.rotation.z = step += 0.01;
        line.rotation.y = step += 0.01;

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function gosper(a, b) {

        var turtle = [0, 0, 0];
        var points = [];
        var count = 0;

        rg(a, b, turtle);


        return points;

        function rt(x) {
            turtle[2] += x;
        }

        function lt(x) {
            turtle[2] -= x;
        }

        function fd(dist) {
            //                ctx.beginPath();
            points.push({
                x: turtle[0],
                y: turtle[1],
                z: Math.sin(count) * 5
            });
            //                ctx.moveTo(turtle[0], turtle[1]);

            var dir = turtle[2] * (Math.PI / 180);
            turtle[0] += Math.cos(dir) * dist;
            turtle[1] += Math.sin(dir) * dist;

            points.push({
                x: turtle[0],
                y: turtle[1],
                z: Math.sin(count) * 5
            });
            //                ctx.lineTo(turtle[0], turtle[1]);
            //                ctx.stroke();

        }

        function rg(st, ln, turtle) {

            st--;
            ln = ln / 2.6457;
            if (st > 0) {
                //                    ctx.strokeStyle = '#111';
                rg(st, ln, turtle);
                rt(60);
                gl(st, ln, turtle);
                rt(120);
                gl(st, ln, turtle);
                lt(60);
                rg(st, ln, turtle);
                lt(120);
                rg(st, ln, turtle);
                rg(st, ln, turtle);
                lt(60);
                gl(st, ln, turtle);
                rt(60);
            }
            if (st == 0) {
                fd(ln);
                rt(60);
                fd(ln);
                rt(120);
                fd(ln);
                lt(60);
                fd(ln);
                lt(120);
                fd(ln);
                fd(ln);
                lt(60);
                fd(ln);
                rt(60)
            }
        }

        function gl(st, ln, turtle) {
            st--;
            ln = ln / 2.6457;
            if (st > 0) {
                //                    ctx.strokeStyle = '#555';
                lt(60);
                rg(st, ln, turtle);
                rt(60);
                gl(st, ln, turtle);
                gl(st, ln, turtle);
                rt(120);
                gl(st, ln, turtle);
                rt(60);
                rg(st, ln, turtle);
                lt(120);
                rg(st, ln, turtle);
                lt(60);
                gl(st, ln, turtle);
            }
            if (st == 0) {
                lt(60);
                fd(ln);
                rt(60);
                fd(ln);
                fd(ln);
                rt(120);
                fd(ln);
                rt(60);
                fd(ln);
                lt(120);
                fd(ln);
                lt(60);
                fd(ln);
            }
        }
    }

}
