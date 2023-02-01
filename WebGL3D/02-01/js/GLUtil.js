function initWebGLCanvas(canvasName) {
    canvas = document.getElementById(canvasName);
    let context = canvas.getContext("webgl2",{antialias:true});
    return context;
}

function loadSingleShader(ctx, shaderScript) {

    if(shaderScript.type == "vertex") {
        var shaderType = ctx.VERTEX_SHADER;
    } else if(shaderScript.type == "fragment") {
        var shaderType = ctx.FRAGMENT_SHADER;
    } else {
        console.log("*** Error: shader script of undefined type '" + shaderScript.type + "'");
        return null;
    }

    var shader = ctx.createShader(shaderType);

    ctx.shaderSource(shader, shaderScript.text);

    ctx.compileShader(shader);

    var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);

    if(!compiled && !ctx.isContextLost()) {
        var error = ctx.getShaderInfoLog(shader);

        console.log(" *** Error compiling shader：" + error);

        ctx.deleteShader(shader);
        return null;
    }
    return shader;
}

function loadShaderSerial(gl, vshader, fshader) {
    var vertexShader = loadSingleShader(gl, vshader);
    var fragmentShader = loadSingleShader(gl, fshader);

    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program,gl.LINK_STATUS);
    if(!linked && !gl.isContextLost()) {
        var error = gl.getProgramInfoLog(program);
        console.log("Error in program linking:" + error);//

        gl.deleteProgram(program);
        gl.deleteProgram(fragmentShader);
        gl.deleteProgram(vertexShader);

        return null;
    }

    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);
    return program;
}
