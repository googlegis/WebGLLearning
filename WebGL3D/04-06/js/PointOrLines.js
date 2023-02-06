function PointOrLines(
    gl,
    programIn
) {
    this.vertexData=[
        0.0, 0.0, 0.0,
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0
    ];

    this.vcount = 5; //得到顶点数
    this.vertexBuffer = gl.createBuffer();//创建顶点坐标缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);//绑定顶点坐标数据缓冲
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData), gl.STATIC_DRAW);//将顶点坐标数据送入缓冲

    this.colorsData=[
        1, 1, 0, 1.0,// 黄
        1, 1, 1, 1.0,// 白
        0, 1, 0, 1.0,// 绿
        1, 1, 1, 1.0,// 白
        1, 1, 0, 1.0// 黄
    ];

    this.colorBuffer = gl.createBuffer();//
    gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer); //绑定颜色数据缓冲
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.colorsData), gl.STATIC_DRAW);//将颜色数据送入缓冲
    this.program = programIn;//初始化着色器程序id
    //绘制物体的方法
    this.drawSelf = function (ms, currentmode) {
        gl.useProgram(this.program);//指定使用某套着色器程序

        var uMVPMatrixHandle = gl.getUniformLocation(this.program, "uMVPMatrix");//获取总变换矩阵引用id

        gl.uniformMatrix4fv(uMVPMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));//将总变换矩阵送入渲染管线

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));//启动顶点坐标数据数组

        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);//绑定顶点坐标数据缓冲

        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aPosition"),3,gl.FLOAT,false,0,0);//给管线指定顶点坐标数据

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aColor"));//启用顶点坐标数据数组
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);//绑定顶点坐标数据缓冲

        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aColor"),4,gl.FLOAT,false,0,0);//给管线指定顶点坐标数据
        gl.lineWidth(10);//设置线的宽度

        switch (currentmode) {
            case '1'://GL_POINTS
                gl.drawArrays(gl.POINTS, 0,5);
                break;
            case '2'://GL_LINES
                gl.drawArrays(gl.LINES,0,5);
                break;
            case '3'://GL_LINE_STRIP
                gl.drawArrays(gl.LINE_STRIP,0,5);
                break;
            case '4'://GL_LINE_LOOP
                gl.drawArrays(gl.LINE_LOOP,0,5);
                break;
            default:
                gl.drawArrays(gl.LINE_LOOP,0,5);
                break;
        }
    }
}