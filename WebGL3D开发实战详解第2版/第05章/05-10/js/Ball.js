function Ball(								//声明绘制用物体对象所属类
    gl,						 					//GL上下文
    programIn	//着色器程序id
){
    this.vertexData=[
        -3,2,0,
        3,-2,0,
        3,2,0,

        -3,2,0,
        -3,-2,0,
        3,-2,0
    ];

    this.vcount=this.vertexData.length/3;					//得到顶点数量
    this.vertexBuffer=gl.createBuffer();				//创建顶点坐标数据缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer); 	//绑定顶点坐标数据缓冲
    //将顶点坐标数据送入缓冲
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);

    this.normalData=[
        0,0,1,
        0,0,1,
        0,0,1,

        0,0,1,
        0,0,1,
        0,0,1,
    ];
    this.normalBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);
    //将法向量坐标数据送入缓冲
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.normalData),gl.STATIC_DRAW);

    this.program=programIn;		//初始化着色器程序id
    this.drawSelf=function(ms)//绘制物体的方法
    {
        gl.useProgram(this.program);//指定使用某套着色器程序
        //获取总变换矩阵引用id
        var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");
        //将总变换矩阵送入渲染管线
        gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix()));

        var uMMatrixHandle=gl.getUniformLocation(this.program, "uMMatrix");
        //将总变换矩阵送入渲染管线
        gl.uniformMatrix4fv(uMMatrixHandle,false,new Float32Array(ms.getMMatrix()));

        var uLightLocationHandle=gl.getUniformLocation(this.program, "uLightLocation");
        gl.uniform3fv(uLightLocationHandle,new Float32Array([lightManager.lx,lightManager.ly,lightManager.lz]));

        var uCameraHandle=gl.getUniformLocation(this.program, "uCamera");
        gl.uniform3fv(uCameraHandle,new Float32Array([ms.cameraFB[0],ms.cameraFB[1],ms.cameraFB[2]]));

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));//启用顶点坐标数据数组
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);	//绑定顶点坐标数据缓冲
        //给管线指定顶点坐标数据
        gl.vertexAttribPointer(gl.getAttribLocation(this.program,"aPosition"),3,gl.FLOAT,false,0, 0);

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aNormal"));//启用法向量数据数组
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);	//绑定法向量数据缓冲
        //给管线指定法向量坐标数据
        gl.vertexAttribPointer(gl.getAttribLocation(this.program,"aNormal"),3,gl.FLOAT,false,0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);		//用顶点法绘制物体

    }
}
