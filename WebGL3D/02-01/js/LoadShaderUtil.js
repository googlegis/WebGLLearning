function shaderObject(typeIn, textIn) { // 生命shaderObject类
    this.type = typeIn; //初始化type成员变量
    this.text = textIn; //初始化text成员变量
}

let shaderStrArray = ["a","a"]; //存储着色器数组

let shaderNumberCount = 0; //数组索引值

let shaderTypeName = ["vertex","fragment"]; //着色器名称数组

/**
 * 处理着色器内容的回调函数
 * @param req
 * @param index
 */
function processLoadShader(req,index) {
    if(req.readyState == 4) { //数据接收
        let shaderStr = req.responseText; //获取响应文本
        shaderStrArray[shaderNumberCount] = new shaderObject(shaderTypeName[shaderNumberCount], shaderStr); // 根据不同的数值索引值创建不同的着色器，并存入着色器数组
        shaderNumberCount++; //数组索引值加1
        if(shaderNumberCount>1) { //如果两个着色器内容均不为空，则加载着色器
            shaderProgArray[index] = loadShaderSerial(gl,shaderStrArray[0],shaderStrArray[1]);
        }
    }
}

/**
 * 从服务器加载着色器脚本的函数
 * @param url
 * @param index
 */
function loadShaderFile(url, index) {
    let req = new XMLHttpRequest(); // 创建XMLHttpRequest对象
    req.onreadystatechange = function () { //设置响应回调函数
        processLoadShader(req,index); // 调用processLoadShader处理响应
    }
    req.open("GET",url,true);//用GET方式打开指定URL
    req.responseType = "text";//设置响应类型
    req.send(null);//发送http请求
}