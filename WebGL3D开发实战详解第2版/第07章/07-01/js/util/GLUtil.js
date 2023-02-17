/**
 * ���ص�����ɫ���ķ���
 */
function loadSingleShader(ctx, shaderScript) {

    if(shaderScript.type == "vertex") { //��Ϊ������ɫ��
        var shaderType = ctx.VERTEX_SHADER;//������ɫ������
    } else if (shaderScript.type == "fragment") { //��ΪƬԪ��ɫ��
        var shaderType = ctx.FRAGMENT_SHADER;//ƬԪ��ɫ��
    } else {
        console.log("***Error: shader script of undefined type:" + shaderScript.type);
        return null;
    }

    var shader = ctx.createShader(shaderType);// �������ʹ�����ɫ������

    ctx.shaderSource(shader, shaderScript.text);//������ɫ���ű�

    ctx.compileShader(shader);//������ɫ��

    var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
    if(!compiled && !ctx.isContextLost()) { // ���������
        var error = ctx.getShaderInfoLog(shader);//��ȡ������Ϣ
        console.log("***Error compiling shader:" + error);//��ӡ������Ϣ
        ctx.deleteShader(shader);//ɾ����ɫ������
        return null;//���ؿ�
    }
    return shader;//������ɫ������
}

/**
 * �������Ӷ��㡢ƬԪ��ɫ���ķ���
 * @param gl
 * @param vshader
 * @param fshader
 * @returns {null|WebGLProgram}
 */
function loadShaderSerial(gl, vshader, fshader) {

    var vertexShader = loadSingleShader(gl, vshader);//���ض�����ɫ��

    var fragmentShader = loadSingleShader(gl, fshader);//����ƬԪ��ɫ��

    var program = gl.createProgram();//������ɫ������

    gl.attachShader(program, vertexShader);//��������ɫ����ӵ���ɫ��������
    gl.attachShader(program,fragmentShader);//��ƬԪ��ɫ����ӵ���ɫ��������

    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program,gl.LINK_STATUS);//��������Ƿ�ɹ�
    if(!linked && !gl.isContextLost()) {
        var error = gl.getProgramInfoLog(program);//��ȡ������Ϣ
        console.log("Error in program linking:" + error);//��ӡ������Ϣ

        gl.deleteProgram(program);//ɾ����ɫ������
        gl.deleteProgram(fragmentShader);//ɾ��ƬԪ��ɫ��
        gl.deleteProgram(vertexShader);//ɾ��������ɫ��

        return null;
    }

    gl.useProgram(program);//
    gl.enable(gl.DEPTH_TEST);//����ȼ��
    return program;
}

function loadImageTexture(gl, url, boolean) {
    var texture = gl.createTexture();//��������ID
    var image = new Image();//����ͼƬ����
    image.onload = function () {
        doLoadImageTexture(gl,image,texture,boolean);//���ü�������ĺ���
    }
    image.src = url;//ָ������ͼ��URL
    return texture;//��������ID
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