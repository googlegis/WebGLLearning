// 该函数浏览器不支持 gl.getExtension('WEBGL_compressed_texture_etc1');
// 可访问下面网站查看支持哪些扩展
// 1. http://www.klayge.org/html/webgl_test.html
// 2. https://webglreport.com
function getExtension(gl, name){
    var vendorPrefixes = ["", "WEBKIT_", "MOZ_"];
    var ext = null;

    const available_extensions = gl.getSupportedExtensions();
    console.log(available_extensions);//查询支持的webgl扩展
    for (var i in vendorPrefixes) {
        ext = gl.getExtension(vendorPrefixes[i] + name);
        if (ext) { break; }
    }
    return ext;
}

//将字节数组转四字节整数
function fromBytesToShort(buff)
{
    try
    {
        var testArray = new Uint8Array(buff);
        return testArray[0]*256+testArray[1];
    }
    catch(err)
    {
        alert(err.message);
        var testArray = new Uint8Array(buff);
        alert("err toint="+testArray[0]+","+testArray[1]);
    }
}

//分析数据并加载为纹理的方法
function loadEtc1Texture(gl,url,texName) {
    var texture = gl.createTexture();
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        doLoadEtc1Texture(gl, req, texture, texName)
    };
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.send(null);
    texMap[texName] = texture;
}

//处理ETC1压缩纹理pkm文件数据的方法
function doLoadEtc1Texture(gl,req,texture,texName)
{
    if (req.readyState == 4)
    {
        var arrayBuffer = req.response;
        if (arrayBuffer)
        {
            var ext = getExtension(gl, "WEBGL_compressed_texture_etc2"); //WEBGL_compressed_texture_s3tc
            var ETC_PKM_HEADER_SIZE = 16;
            var dataHeader = arrayBuffer.slice(0, ETC_PKM_HEADER_SIZE);
            var width=fromBytesToShort(dataHeader.slice(12, 14));
            var height=fromBytesToShort(dataHeader.slice(14, 16));
            var texData=arrayBuffer.slice(ETC_PKM_HEADER_SIZE);

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.compressedTexImage2D(gl.TEXTURE_2D, 0,  ext.COMPRESSED_RGB_ETC1_WEBGL, width, height, 0, new Uint8Array(texData));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }
}






