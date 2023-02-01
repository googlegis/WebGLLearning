/**
 * 初始化WebGL Canvas的方法
 * @param canvasName
 * @returns {*}
 */
function initWebGLCanvas(canvasName) {
    canvas = document.getElementById(canvasName); //获取Canvas对象
    let context = canvas.getContext("webgl2",{antialias:true});//获取GL上下文
    return context;//返回GL上下文对象
}

/**
 * 加载单个着色的方法
 * @param ctx
 * @param shaderScript
 * @returns {WebGLShader|null}
 */
function loadSingleShader(ctx, shaderScript) {

    if(shaderScript.type == "vertex") { //若为顶点着色器
        var shaderType = ctx.VERTEX_SHADER; //顶点着色器类型
    } else if(shaderScript.type == "fragment") { //若为片元着色器
        var shaderType = ctx.FRAGMENT_SHADER; //片元着色器类型
    } else { //否则打印错误信息
        console.log("*** Error: shader script of undefined type '" + shaderScript.type + "'");
        return null;
    }

    var shader = ctx.createShader(shaderType);//根据类型创建着色器程序， *** 变量 shaderType 需使用 var 类型，不要用let，否则此处代码不通。

    ctx.shaderSource(shader, shaderScript.text); //加载着色器脚本

    ctx.compileShader(shader); //编译着色器

    var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS); //检查编译状态

    if(!compiled && !ctx.isContextLost()) { //若编译出错
        var error = ctx.getShaderInfoLog(shader); //获取错误信息

        console.log(" *** Error compiling shader：" + error); //打印错误信息

        ctx.deleteShader(shader); // 删除着色器程序
        return null;//返回空
    }
    return shader; //返回着色器程序
}

/**
 * 加载链接顶点、片元着色器的方法
 * @param gl
 * @param vshader
 * @param fshader
 * @returns {null|WebGLProgram}
 */
function loadShaderSerial(gl, vshader, fshader) {
    var vertexShader = loadSingleShader(gl, vshader); //加载顶点着色器
    var fragmentShader = loadSingleShader(gl, fshader);//加载片元着色器

    var program = gl.createProgram();//创建着色器程序

    gl.attachShader(program, vertexShader);//将顶点着色器添加到着色器程序中
    gl.attachShader(program, fragmentShader);//将片元着色器添加到着色器程序中

    gl.linkProgram(program);//链接着色器程序

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
