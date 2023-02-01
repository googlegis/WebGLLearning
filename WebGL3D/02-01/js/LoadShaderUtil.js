function shaderObject(typeIn, textIn) {
    this.type = typeIn;
    this.text = textIn;
}

let shaderStrArray = ["a","a"];

let shaderNumberCount = 0;

let shaderTypeName = ["vertex","fragment"];

function processLoadShader(req,index) {
    if(req.readyState == 4) {
        let shaderStr = req.responseText;
        shaderStrArray[shaderNumberCount] = new shaderObject(shaderTypeName[shaderNumberCount], shaderStr);
        shaderNumberCount++;
        if(shaderNumberCount>1) {
            shaderProgArray[index] = loadShaderSerial(gl,shaderStrArray[0],shaderStrArray[1]);
        }
    }
}

function loadShaderFile(url, index) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        processLoadShader(req,index)
    }
    req.open("GET",url,true);
    req.responseType = "text";
    req.send(null);
}