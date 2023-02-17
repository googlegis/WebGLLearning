/**
 * ����shaderObject��
 * @param typeIn
 * @param textIn
 */
function shaderObject(typeIn,textIn)
{
    this.type=typeIn;//��ʼ��type��Ա����
    this.text=textIn;//��ʼ��text��Ա����
}

var shaderStrArray=["",""];
var shaderNumberCount=[0,0];
var shaderTypeName=["vertex","fragment"];

/**
 * ������ɫ���ű����ݵĻص�����
 * @param req
 * @param index
 */
function processLoadShader(req,index)
{
    if (req.readyState == 4) //��״̬Ϊ4
    {
        var shaderStr = req.responseText;//��ȡ��Ӧ�ı�
        shaderStrArray[shaderNumberCount[index]]=new shaderObject(shaderTypeName[shaderNumberCount[index]],shaderStr);//������ɫ���ű�����
        shaderNumberCount[index]++;
        if(shaderNumberCount[index]>1)//���������ɫ�����ݾ���Ϊ��
        {
            shaderProgArray[index]=loadShaderSerial(gl,shaderStrArray[0], shaderStrArray[1]);//������ɫ��
        }
    }
}

/**
 * ������ɫ���ķ���
 * @param url
 * @param index
 */
function loadShaderFile(url,index)//�ӷ�����������ɫ���ű��ĺ���
{
    var req = new XMLHttpRequest();//����XMLHttpRequest����
    req.onreadystatechange = function () //������Ӧ�ص�����
    { processLoadShader(req,index) };//����processLoadShader������Ӧ
    req.open("GET", url, true);//��GET��ʽ��ָ��URL
    req.responseType = "text";//������Ӧ����
    req.send(null);//����HTTP����
}


