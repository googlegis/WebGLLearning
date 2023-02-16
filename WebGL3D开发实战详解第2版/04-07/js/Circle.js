/**
 * �����������������������
 * @param gl
 * @param programIn
 * @constructor
 */
function Circle(
    gl,			//GL������
    programIn	//��ɫ������id
){
    var angdegSpan = 360/10;
    var vertexarray = new Array();//������������
    var colorarray = new Array();//������ɫ����

    //�������ݳ�ʼ��
    var count=0;
    vertexarray[count++] = 0;//��ʼ��ԭ��
    vertexarray[count++] = 0;
    vertexarray[count++] = 0;

    for(var i=0; Math.ceil(i)<=360; i+=angdegSpan) {
        var angrad=i*Math.PI/180;//��ǰ����
        //��ǰ��
        vertexarray[count++]=0.5*Math.sin(angrad);//��������
        vertexarray[count++]=0.5*Math.cos(angrad);
        vertexarray[count++]=0;
    }
    this.vertexData=vertexarray;
    this.vcount=12;					//�õ���������
    this.vertexBuffer=gl.createBuffer();				//���������������ݻ���
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer); 	//�󶨶����������ݻ���
    //�����������������뻺��
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);

    count = 0;
    colorarray[count++] = 1;
    colorarray[count++] = 1;
    colorarray[count++] = 1;
    colorarray[count++] = 1.0;
    for(var i=4; i<48; i+=4){
        colorarray[count++] = 1;
        colorarray[count++] = 1;
        colorarray[count++] = 0;
        colorarray[count++] = 1.0;
    }
    this.colorsData=colorarray;
    this.colorBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer); 	//����ɫ���ݻ���
    //����ɫ�������뻺��
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.colorsData),gl.STATIC_DRAW);
    this.program=programIn;		//��ʼ����ɫ������id
    this.drawSelf=function(ms)//��������ķ���
    {
        gl.useProgram(this.program);//ָ��ʹ��ĳ����ɫ������
        //��ȡ�ܱ任��������id
        var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");
        //���ܱ任����������Ⱦ����
        gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix()));

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));//���ö���������������
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);	//�󶨶����������ݻ���
        //������ָ��������������
        gl.vertexAttribPointer(gl.getAttribLocation(this.program,"aPosition"),3,gl.FLOAT,false,0, 0);

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aColor"));//���ö���������������
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);	//�󶨶����������ݻ���
        //������ָ��������������
        gl.vertexAttribPointer(gl.getAttribLocation(this.program,"aColor"),4,gl.FLOAT,false,0, 0);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vcount);		//����Բ
    }
}
