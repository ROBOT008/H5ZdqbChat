// 建立连接对象（还未发起连接）
var socket = null;
var stompClient;

const t_name = "chat_test_msg";
const INSERT_USER_SQL = "insert into " + t_name + " (fromId, toId,content) values(?,?,?)";

if (typeof(stompClient) === "undefined" ) {
    openSocket();
}


function openSocket() {
    socket = new SockJS("http://192.168.1.13:9777/ws")
    // 获取 STOMP 子协议的客户端对象
    stompClient = Stomp.over(socket);

    // 向服务器发起websocket连接并发送CONNECT帧
    stompClient.connect({},
        function connectCallback(frame) {
            console.log("连接成功");
            //私聊
            stompClient.subscribe('/msg/' + fid, function (response) {
                var returnData = JSON.parse(response.body);
                // console.log("收到消息a：", returnData);
                getMsg(returnData);
            });


            //群聊
            stompClient.subscribe('/topic', function (response) {
                var returnData = JSON.parse(response.body);
                console.log("收到消息a：", returnData);
            });

        },
        function errorCallBack(error) {
            // 连接失败时（服务器响应 ERROR 帧）的回调方法
            console.log("连接失败");
        }
    );
}


function sendMsg(msg) {
    var messageJson = JSON.stringify(msg);
    stompClient.send("/app/sendMsg", {}, messageJson);
}

function scrollToEnd() {//滚动到底部
    const h = 80 * ulflistVue.chatList.length + 1000;
    $('ul.ulflist').animate({
        scrollTop: h
    })
}

//#################################################
const db = openDatabase("chat", "1.0", "保存聊天记录", 1024 * 1024);
const result = db ? "数据库创建成功" : "数据库创建失败";
console.log(result+"=============================");
const QUERY_USER_SQL = "select * from " + t_name;


//删除
// const DROP_USER_SQL = "drop table " + t_name;
// dropTable(DROP_USER_SQL,function (res) {
//     console.log(res)
// },function (e) {
//     console.log(e)
// });
//



function createTable(sql, successFun, errorFun) {

    if(db == null ){
        console.log("db空")
        return
    }

    if(typeof (db) === "undefined"){
        console.log("db-->undefined")
        return
    }




    db.transaction(function (tx) {
        tx.executeSql(sql,[],function (tx,result) {
            successFun(result)
        },function (tx,error) {
            errorFun(error)
        })
    })
}


const USER_TABLE_SQL = "create table if not exists " + t_name + " (fromId varchar(12),toId varchar(12),content text)";
createTable(USER_TABLE_SQL, function (res) {
    // console.log('成功USER_TABLE_SQL', res)
    selectMsg();
}, function (e) {
    console.log('失败USER_TABLE_SQL', e)
});


function insertDataChat(sql, enter, successFun, errorFun) {
    db.transaction(function (tx) {
        tx.executeSql(sql,[enter.fromId, enter.toId, enter.content],function (tx,result) {
            successFun(result)
        },function (tx,error) {
            errorFun(error)
        })
    })
}


function queryData(sql, successFun, errorFun) {
    db.transaction(function (tx) {
        tx.executeSql(sql,[],function (tx,result) {
            successFun(result.rows)
        },function (tx,error) {
            errorFun(error)
        })
    })
}

function selectMsg() {
    queryData(QUERY_USER_SQL, function (res) {
        for (var i = 0; i < res.length; i++) {
            ulflistVue.chatList.push(res[i])
        }
        scrollToEnd();
    }, function (e) {
        console.log("查询失败QUERY_USER_SQL", e)
    })
}
