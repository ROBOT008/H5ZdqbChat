var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var userid;
    console.log("当前设备终端", isAndroid, isiOS);

// 建立连接对象（还未发起连接）
var socket = null;
var stompClient;

const t_name = "chat_test_msg";
const INSERT_USER_SQL = "insert into " + t_name + " (fromId, toId,content) values(?,?,?)";

if (typeof(stompClient) === "undefined") {
    userid = localStorage.getItem("userid");
    console.log("当前登录用户", userid)
    openSocket();
}

//  /**
//      * 发送方
//      */
//     private String fromId;
//     /**
//      * 接收方
//      */
//     private String toId;
//     /**
//      * 消息命令;
//      */
//     private String cmd;
//     /**
//      * 聊天类型
//      */
//     private String chatType;
//     /**
//      * 消息类型
//      */
//     private String msgType;
//     /**
//      * 消息体;
//      */
//     private String contentText;

function openSocket() {
//    socket = new SockJS("http://socket.zhuandaonet.com/ws"); //测试
     socket = new SockJS("http://zdchat.zhuandaonet.com/ws"); //发布
    // 获取 STOMP 子协议的客户端对象
    stompClient = Stomp.over(socket);

    // 向服务器发起websocket连接并发送CONNECT帧
    stompClient.connect({},
        function connectCallback(frame) {
            console.log("连接成功");
            //私聊 // 群聊
            stompClient.subscribe('/chatMsg/' + userid, function (response) {
                var returnData = JSON.parse(response.body);
                // console.log("收到消息a：", returnData);
                getMsg(returnData);
            });


        },
        function errorCallBack(error) {
            // 连接失败时（服务器响应 ERROR 帧）的回调方法
            console.log("连接失败", error);
        }
    );
}

//发送私聊消息
function sendMsg(msg) {
    var messageJson = JSON.stringify(msg);
    stompClient.send("/app/sendPrivateMsg", {}, messageJson);
}

//发送群聊消息
function sendALLMsg(msg) {
    stompClient.send("/app/sendGroupMsg", {}, JSON.stringify(msg));
}


function scrollToEnd() {//滚动到底部
    const h = 80 * ulflistVue.chatList.length + 1200;
    var val_inp = $("#form_article").html();
    $('ul.ulflist').animate({
        scrollTop: h
    });
}


//########################################################################

/**
 * 向App(IOS,Android)请求消息
 */
function getListFriend() {
    if (isAndroid) {
        JavaScriptHandler.getListFriend();
    } else if (isiOS) {
        window.webkit.messageHandlers.getListFriend.postMessage();
    }
}

/**
 * 接收App(IOS,Android)消息
 */
function setListFriend(res) {
    console.log('接收App(IOS,Android)消息' + res)
}


/**
 * 向App(IOS,Android)存储数据
 * @param msgdate
 */
function saveMsgByApp(msgdate) {
    if (isAndroid) {
        JavaScriptHandler.saveMsgSql(JSON.stringify(msgdate));
    } else if (isiOS) {
        window.webkit.messageHandlers.saveMsgSql.postMessage(JSON.stringify(msgdate));
    }
}


/**
 * 请求App获取聊天记录
 */
function getHis() {
    var uid = {
        "fromId": fid,
        "toId": toUserId
    }
    if (isAndroid) {
        JavaScriptHandler.getHis(JSON.stringify(uid));
    } else if (isiOS) {
        window.webkit.messageHandlers.getHis.postMessage(JSON.stringify(uid));
    }
}


/**
 * 接收App(IOS)消息记录
 * @param res
 */
function getMsgByIOS(res) {
    console.log('接收App(IOS)消息记录' + res)
    var json = JSON.parse(res);
    ulflistVue.chatList = json.result;
    scrollToEnd();
}


/**
 * 接收App(Android)消息记录
 * @param res
 */
function getMsgByAndroid(res) {
    console.log('接收App(Android)消息记录' + res)
    ulflistVue.chatList = res.result;
    scrollToEnd();
}


