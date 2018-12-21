//参考
//https://blog.csdn.net/qq_33429583/article/details/79674597
// ##################################################华丽的分割线开始########################################################//
//创建数据表 const sql = "create table if not exists userTable (id integer primary key autoincrement,username varchar(12)," +
//         "password varchar(16),info text)";
/**
 * 创建数据表
 * @param sql
 * @param successFun
 * @param errorFun
 */
function createTable(sql, successFun, errorFun) {
    db.transaction(tx => {
        tx.executeSql(sql, [],
            (tx, result) => {
                successFun(result)
            }, (tx, error) => {
                errorFun(error)
            })
    })
}

//查询数据 const sql = "select * from t_name";
/**
 * 查询数据
 * @param sql
 * @param successFun
 * @param errorFun
 */
function queryData(sql, successFun, errorFun) {
    db.transaction(tx => {
        tx.executeSql(sql, [],
            (tx, result) => {
                successFun(result.rows)
            },
            (tx, error) => {
                errorFun(error)
            })
    })
}
// ##################################################华丽的分割线结束########################################################//





//删除数据表 const DROP_USER_SQL = "drop table userTable";
/**
 * 删除数据表
 * @param sql
 * @param successFun
 * @param errorFun
 */
function dropTable(sql, successFun, errorFun) {
    db.transaction(tx => {
        tx.executeSql(sql, [],
            (transaction, resultSet) => {
                successFun(resultSet)
            }, (transaction, error) => {
                errorFun(error)
            })
    })
}


// const DROP_USER_SQL = "drop table " + t_name;
// dropTable(DROP_USER_SQL,function (res) {
//     console.log(res)
// },function (e) {
//     console.log(e)
// });



//插入数据 const sql = "insert into t_name (username, password,info) values(?,?,?)";
/**
 * 添加数据
 * @param sql
 * @param user 对象数据
 * @param successFun
 * @param errorFun
 */
function insertData(sql, user, successFun, errorFun) {
    db.transaction(tx => {
        tx.executeSql(sql,
            [user.username, user.password, user.info],
            (tx, result) => {
                successFun(result)
            }, (tx, error) => {
                errorFun(error)
            })
    })
}



/**
 * 查询数据带条件
 * @param sql
 * @param user
 * @param successFun
 * @param errorFun
 */
function queryDataByID(sql, user, successFun, errorFun) {
    db.transaction(tx => {
        tx.executeSql(sql, [user.id],
            (tx, result) => {
                successFun(result.rows)
            },
            (tx, error) => {
                errorFun(error)
            })
    })
}

//修改数据   const sql = "update t_name set password = ? where username = ?";
/**
 * 修改数据
 * @param sql
 * @param user 对象数据
 * @param successFun
 * @param errorFun
 */
function updateData(sql, user, successFun, errorFun) {
    db.transaction(tx => {
        tx.executeSql(sql, [user.password, user.id],
            (tx, result) => {
                successFun(result)
            }, (tx, error) => {
                errorFun(error)
            })
    })
}

//删除数据 const DELETE_USER_SQL = "delete from userTable where username = ?";

/**
 * 删除数据
 * @param sql
 * @param user 对象数据
 * @param successFun
 * @param errorFun
 */
function deleteData(sql, user, successFun, errorFun) {
    db.transaction(tx => {
        // tx.executeSql(sql, [user],
        tx.executeSql(sql, [user.id],
            (transaction, resultSet) => {
                successFun(resultSet)
            }, (transaction, error) => {
                errorFun(error)
            })
    });
}

//删除数据表 const DROP_USER_SQL = "drop table userTable";
/**
 * 删除数据表
 * @param sql
 * @param successFun
 * @param errorFun
 */
function dropTable(sql, successFun, errorFun) {
    db.transaction(tx => {
        tx.executeSql(sql, [],
            (transaction, resultSet) => {
                successFun(resultSet)
            }, (transaction, error) => {
                errorFun(error)
            })
    })
}





let db = openDatabase("chat", "1.0", "保存聊天记录", 1024 * 1024);
let result = db ? "数据库创建成功" : "数据库创建失败";
console.log(result);
const QUERY_USER_SQL = "select * from " + t_name;

//删除
// const DROP_USER_SQL = "drop table " + t_name;
// dropTable(DROP_USER_SQL,function (res) {
//     console.log(res)
// },function (e) {
//     console.log(e)
// });
//


// const USER_TABLE_SQL = "create table if not exists " + t_name + " (fromUserId varchar(12),toUserId varchar(12),contentText text,cmd varchar(3),chatType varchar(2),msgType varchar(2))";
const USER_TABLE_SQL = "create table if not exists " + t_name + " (fromId varchar(12),toId varchar(12),content text)";
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
            [enter.fromId, enter.toId, enter.content],
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


