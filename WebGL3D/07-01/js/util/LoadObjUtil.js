
function ObjectData(vertexCountIn, verticesIn, normalsIn) {
    this.vertexCount = vertexCountIn;
    this.vertices = verticesIn;
    this.normals = normalsIn;
}

function Normal(nxIn, nyIn, nzIn) {
    this.nx = nxIn;
    this.ny = nyIn;
    this.nz = nzIn;
    this.compareNormal = function (normal) {
        var DIFF = 0.000001;
        if((this.nx-normal.nx < DIFF) && (this.ny - normal.ny < DIFF) && (this.nz - normal.nz < DIFF)) {
            return false;
        } else {
            return true;
        }
    }
}

function SetOfNormal()
{
    this.array=new Array().fill(0);
    this.add=function(index,normal)
    {
        if(this.array[index]==null)
        {
            this.array[index]= new Array();
            this.array[index].push(normal);
        }else{
            var flag=true;
            for(var j=0;j<this.array[index].length;j++)
            {
                if(this.array[index][j].compareNormal(normal)==false)
                {
                    flag=false;
                }
            }
            if(flag=true){
                this.array[index].push(normal);
            }
        }
    }
}


function fromObjStrToObjectData(objStr) {

    var alv = new Array().fill(0);//ԭʼ���������б���ֱ�Ӵ�obj�ļ��м���

    var alvResult = [];//������������б�--������֯��

    var aln = [];

    var alnResult=[];//���������������

    var alFaceIndex =[];//���������б�

    var setOfNormal = new SetOfNormal();
    var lines = objStr.split("\n");//

    for(var lineIndex in lines) {
        console.log(99999,lines[lineIndex])
        var line = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/,"");
        console.log(88888,line);

        if(line[0]=="#") {
            continue;
        }

        var array = line.split(" ");
        if(array[0] == "v") {
            alv.push(parseFloat(array[1]));
            alv.push(parseFloat(array[2]));
            alv.push(parseFloat(array[3]));
        } else if(array[0] == "f") {
            var index = new Array(3);//������������ֵ������

            if(array.length !=4) {
                console.log(77777,line);
                alert("array.length != 4");
                continue;
            }

            var tempArray=array[1].split("/");
            index[0]=tempArray[0]-1;
            vx0=alv[index[0]*3+0];
            vy0=alv[index[0]*3+1];
            vz0=alv[index[0]*3+2];

            alvResult.push(vx0);
            alvResult.push(vy0);
            alvResult.push(vz0);
            alFaceIndex.push(index[0]);

            var tempArray=array[2].split("/");
            index[1]=tempArray[0]-1;
            vx1=alv[index[1]*3+0];
            vy1=alv[index[1]*3+1];
            vz1=alv[index[1]*3+2];

            alvResult.push(vx1);
            alvResult.push(vy1);
            alvResult.push(vz1);
            alFaceIndex.push(index[1]);

            var tempArray=array[3].split("/");
            index[2]=tempArray[0]-1;
            vx2=alv[index[2]*3+0];
            vy2=alv[index[2]*3+1];
            vz2=alv[index[2]*3+2];

            alvResult.push(vx2);
            alvResult.push(vy2);
            alvResult.push(vz2);
            alFaceIndex.push(index[2]);
            //��¼����Ķ�������

            var vxa=vx1-vx0;
            var vya=vy1-vy0;
            var vza=vz1-vz0;

            var vxb=vx2-vx0;
            var vyb=vy2-vy0;
            var vzb=vz2-vz0;
            var vNormal= vectorNormal(getCrossProduct(vxa,vya,vza,vxb,vyb,vzb));
            setOfNormal.add(index[0],vNormal);
            setOfNormal.add(index[1],vNormal);
            setOfNormal.add(index[2],vNormal);
        }
    }

    for(i=0;i<setOfNormal.array.length;i++)
    {     var avernormal=new Array(0,0,0);
        if(setOfNormal.array[i]!=null)
        {
            for(j=0;j<setOfNormal.array[i].length;j++)
            {

                avernormal[0]+=(setOfNormal.array[i][j]).nx;
                avernormal[1]+=(setOfNormal.array[i][j]).ny;
                avernormal[2]+=(setOfNormal.array[i][j]).nz;
            }
            avernormal=vectorNormal(avernormal);
            aln.push(avernormal.nx,avernormal.ny,avernormal.nz);
        }
    }
    for(i=0;i<alFaceIndex.length;i++)
    {
        alnResult.push(aln[alFaceIndex[i]*3],aln[alFaceIndex[i]*3+1],aln[alFaceIndex[i]*3+2]);
    }
    return new ObjectData(alvResult.length/3,alvResult,alnResult);
}

function getCrossProduct(x1,y1,z1,x2,y2,z2) {
    var array = new Array();
    //�������ʸ�����ʸ����XYZ��ķ���ABC
    var A = y1 * z2 - y2 * z1;
    var B = z1 * x2 - z2 * x1;
    var C = x1 * y2 - x2 * y1;
    array.push(A, B, C);
    return array;
}

function vectorNormal(vector) {
    //��������ģ
    var module = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2]);
    return new Normal(vector[0] / module, vector[1] / module, vector[2] / module);
}