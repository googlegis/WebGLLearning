   function MatrixState()
   {
   	  this.mProjMatrix = new Array(16);//ͶӰ����
   	  this.mVMatrix = new Array(16);//���������
   	  this.currMatrix=new Array(16);//�����任����
   	  this.mStack=new Array(100);//����ջ
   	  this.cameraFB = new Array(3);//�洢�����λ�õ�����

	   /**
		* ��������������ķ���
		* @param cx
		* @param cy
		* @param cz
		* @param tx
		* @param ty
		* @param tz
		* @param upx
		* @param upy
		* @param upz
		*/
	  this.setCamera = function (
		  cx,cy,cz, // �����λ�õ�x��y��z����
		  tx,ty,tz, //�۲�Ŀ����x��y��z����
		  upx,upy,upz //�����up������x��y��z����
	  ) {
		setLookAtM(this.mVMatrix,0,cx,cy,cz,tx,ty,tz,upx,upy,upz);//����������۲����
		this.cameraFB[0] = cx;//�洢�����x����
		this.cameraFB[1] = cy;//�洢�����y����
		this.cameraFB[2] = cz;//�洢�����z����
	  }

   	  //��ʼ������ķ���
   	  this.setInitStack=function()
	    {
	    	this.currMatrix=new Array(16);//�������ڴ洢����Ԫ�ص�����
	    	setIdentityM(this.currMatrix,0);//��Ԫ�����Ϊ��λ���Ԫ��ֵ
	    }
	    
	    //�����任���󣬵�ǰ������ջ
	    this.pushMatrix=function()
	    {	    	
	    	this.mStack.push(this.currMatrix.slice(0));
	    }
	    
	    //�ָ��任���󣬵�ǰ�����ջ
	    this.popMatrix=function()
	    {
	    	this.currMatrix=this.mStack.pop();
	    }
	    
	    //ִ��ƽ�Ʊ任
	    this.translate=function(x,y,z)//������xyz���ƶ�
	    {
	    	translateM(this.currMatrix, 0, x, y, z);//��ƽ�Ʊ任��¼������
	    }
	    
	    //ִ����ת�任
	    this.rotate=function(angle,x,y,z)//������xyz���ƶ�
	    {
	    	rotateM(this.currMatrix,0,angle,x,y,z);//����ת�任��¼������
	    }
		
		//ִ�����ű任
		this.scale=function(x,y,z)//������xyz���ƶ�
		{
			scaleM(this.currMatrix,0,x,y,z)//�����ű任��¼������ 
		}
	    
	    //���������
	    this.setCamera=function
	    (
	    		cx,	//�����λ��x
	    		cy,   //�����λ��y
	    		cz,   //�����λ��z
	    		tx,   //�����Ŀ���x
	    		ty,   //�����Ŀ���y
	    		tz,   //�����Ŀ���z
	    		upx,  //�����UP����X����
	    		upy,  //�����UP����Y����
	    		upz   //�����UP����Z����		
	    )
	    {
	    	setLookAtM
	      (
	        		this.mVMatrix,0, 
	        		cx,cy,cz,
	        		tx,ty,tz,
	        		upx,upy,upz
	      );
	    }
	    
	    //����͸��ͶӰ����
	    this.setProjectFrustum=function
	    (
	    	left,		//near���left
	    	right,    //near���right
	    	bottom,   //near���bottom
	    	top,      //near���top
	    	near,		//near�����
	    	far       //far�����
	    )
	    {
	    	 frustumM(this.mProjMatrix, 0, left, right, bottom, top, near, far);    	
	    }
	    
	    //��������ͶӰ����
	    this.setProjectOrtho=function
	    (
	    	left,		//near���left
	    	right,    //near���right
	    	bottom,   //near���bottom
	    	top,      //near���top
	    	near,		//near�����ӵ�ľ���
	    	far       //far�����ӵ�ľ���
	    )
	    {    	
	    	orthoM(this.mProjMatrix, 0, left, right, bottom, top, near, far);
	    }  
	    
	    //��ȡ����������ܱ任����
	    this.getFinalMatrix=function()
	    {
	    	var mMVPMatrix=new Array(16);
	    	multiplyMM(mMVPMatrix, 0, this.mVMatrix, 0, this.currMatrix, 0);
			multiplyMM(mMVPMatrix, 0, this.mProjMatrix, 0, mMVPMatrix, 0);        
			return mMVPMatrix;
	    } 
	    
	    //��ȡ��������ı任����
	    this.getMMatrix=function()
	    {       
	        return this.currMatrix;
	    }
   }