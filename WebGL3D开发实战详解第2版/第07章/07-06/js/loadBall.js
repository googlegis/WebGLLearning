function loadObjFile(url)//请求读取obj文件的方法
{
    var req = new XMLHttpRequest();//创建对服务器的请求
    req.onreadystatechange = function () { processLoadObj(req) };//重写请求的onreadystatechange事件
    req.open("GET", url, true);//设置请求的类型和obj文件的路径
    req.responseType = "text";//设置回应的类型
    req.send(null);
}

function createObj(objDataIn)
{
    if(shaderProgArray[0])
    {
        //创建绘制用的物体
        ooTri=new ObjObject(gl,objDataIn.vertices,objDataIn.normals,shaderProgArray[0]);
    }
    else
    {
        setTimeout(function(){createObj(objDataIn);},10);
    }
}

function processLoadObj(req)//重写后的onreadystatechange事件
{
    if (req.readyState == 4) //当接受到服务器传来的数据后
    {
        var objStr = req.responseText;//得到obj文件的文本数据
        var dataTemp=fromObjStrToObjectData(objStr);//对数据进行处理和提取
        createObj(dataTemp);//用提取的数据创建绘制对象
    }
}