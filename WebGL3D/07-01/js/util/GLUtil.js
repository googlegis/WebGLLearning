/**
 * 加载单个着色器的方法
 */
function loadSingleShader(ctx, shaderScript) {

    if(shaderScript.type == "vertex") { //若为顶点着色器
        var shaderType = ctx.VERTEX_SHADER;//顶点着色器类型
    } else if (shaderScript.type == "fragment") { //若为片元着色器
        var shaderType = ctx.FRAGMENT_SHADER;//片元着色器
    } else {
        console.log("***Error: shader script of undefined type:" + shaderScript.type);
        return null;
    }

    var shader = ctx.createShader(shaderType);// 根据类型创建着色器程序

    ctx.shaderSource(shader, shaderScript.text);//加载着色器脚本

    ctx.compileShader(shader);//编译着色器

    var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
    if(!compiled && !ctx.isContextLost()) { // 若编译出错
        var error = ctx.getShaderInfoLog(shader);//获取错误信息
        console.log("***Error compiling shader:" + error);//打印错误信息
        ctx.deleteShader(shader);//删除着色器程序
        return null;//返回空
    }
    return shader;//返回着色器程序
}

/**
 * 加载链接顶点、片元着色器的方法
 * @param gl
 * @param vshader
 * @param fshader
 * @returns {null|WebGLProgram}
 */
function loadShaderSerial(gl, vshader, fshader) {

    var vertexShader = loadSingleShader(gl, vshader);//加载顶点着色器

    var fragmentShader = loadSingleShader(gl, fshader);//加载片元着色器

    var program = gl.createProgram();//创建着色器程序

    gl.attachShader(program, vertexShader);//将顶点着色器添加到着色器程序中
    gl.attachShader(program,fragmentShader);//将片元着色器添加到着色器程序中

    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program,gl.LINK_STATUS);//检查链接是否成功
    if(!linked && !gl.isContextLost()) {
        var error = gl.getProgramInfoLog(program);//获取错误信息
        console.log("Error in program linking:" + error);//打印错误信息

        gl.deleteProgram(program);//删除着色器程序
        gl.deleteProgram(fragmentShader);//删除片元着色器
        gl.deleteProgram(vertexShader);//删除顶点着色器

        return null;
    }

    gl.useProgram(program);//
    gl.enable(gl.DEPTH_TEST);//打开深度检测
    return program;
}

function loadImageTexture(gl, url, boolean) {
    var texture = gl.createTexture();//创建纹理ID
    var image = new Image();//创建图片对象
    image.onload = function () {
        doLoadImageTexture(gl,image,texture,boolean);//调用加载纹理的函数
    }
    image.src = url;//指定纹理图的URL
    return texture;//返回纹理ID
}

function doLoadImageTexture(gl, image, texture, boolean) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);

    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);//
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);//

    if(!boolean) {
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    } else {
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
    }

    gl.bindTexture(gl.TEXTURE_2D,null);//
}