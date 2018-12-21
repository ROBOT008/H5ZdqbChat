var socket;
var surl = '192.168.1.13:8081';

function openSocket(userid, successFun, errorFun) {
    if (typeof(WebSocket) == "undefined") {
        alert('您的浏览器不支持WebSocket')
        console.log("您的浏览器不支持WebSocket");
    } else {
        alert('您的浏览器支持WebSocket')
        // console.log("您的浏览器支持WebSocket");
        var socketUrl = 'ws://' + surl + '?userId=' + userid;
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function () {
            successFun('onopen', 'websocket已打开');
            //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        socket.onmessage = function (msg) {
            //发现消息进入    开始处理前端触发逻辑
            successFun('onmessage', msg.data)
        };
        //关闭事件
        socket.onclose = function () {
            errorFun('onclose', 'websocket已关闭');
        };
        //发生了错误事件
        socket.onerror = function () {
            errorFun('onerror', 'websocket发生了错误')
        }
    }
}


function sendMessage(msgd) {
    if (typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    } else {
        var json_msg = JSON.stringify(msgd);
        console.log(json_msg)
        socket.send(json_msg);
    }
}
