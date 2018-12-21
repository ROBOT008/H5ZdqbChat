let t_name = "chat_test_msg";
const INSERT_USER_SQL = "insert into " + t_name + " (fromUserId, toUserId,contentText,cmd,chatType,msgType) values(?,?,?,?,?,?)";

let db = openDatabase("chat", "1.0", "保存聊天记录", 1024 * 1024);
let result = db ? "数据库创建成功" : "数据库创建失败";
console.log(result);
const QUERY_USER_SQL = "select * from " + t_name;

const USER_TABLE_SQL = "create table if not exists " + t_name + " (fromUserId varchar(12),toUserId varchar(12),contentText text,cmd varchar(3),chatType varchar(2),msgType varchar(2))";
createTable(USER_TABLE_SQL, function (res) {
    // console.log('成功USER_TABLE_SQL', res)
    selectMsg();
}, function (e) {
    console.log('失败USER_TABLE_SQL', e)
});

/**
 *
 * @param sql
 * @param enter 实体信息
 * @param successFun
 * @param errorFun
 */
function insertDataChat(sql, enter, successFun, errorFun) {
    db.transaction(tx => {
        tx.executeSql(sql,
            [enter.fromUserId, enter.toUserId, enter.contentText,enter.cmd,enter.chatType,enter.msgType],
            (tx, result) => {
                successFun(result)
            }, (tx, error) => {
                errorFun(error)
            })
    })
}


function saveMsgSql(msg) {
    console.log("sql:" + INSERT_USER_SQL)
    insertDataChat(INSERT_USER_SQL, msg, function (res) {
        console.log("保存数据成功", res)
    }, function (e) {
        console.log("保存数据失败", e)
    });
}
