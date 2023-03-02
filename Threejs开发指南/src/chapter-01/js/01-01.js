function init() {
    console.log("Using Three js version:" + THREE.REVISION)

    //多年以后，如果不看书本，你会发现这个页面打开是一片空白，你会一脸懵圈，所以把版本加到页面div显示了。
    document.getElementById("webgl-output").innerHTML = "Using Three js version:" + THREE.REVISION;
}
