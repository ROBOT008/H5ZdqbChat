var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var imgurl = "https://img.zhuandaonet.com/";
var headUrl = localStorage.getItem("headUrl");

/**
 * 是否为测试
 * @type {boolean}
 */
//var isDeBug = true;
 var isDeBug = false;

/**
 * 数组删除元素
 * @param val
 */
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * 返回上一页
 */
function backHis() {
    history.back(-1);
}

// /**
//  * 根据手机号等查询好友
//  * @param phone
//  */
// function seachFriendByApp(phone) {
//     var data = {
//         "phone": phone
//     };
//     if (isAndroid) {
//         JavaScriptHandler.seachFriend(JSON.stringify(data));
//     } else if (isiOS) {
//         window.webkit.messageHandlers.seachFriend.postMessage(JSON.stringify(data));
//     }
// }

/**
 *
 *  向App(IOS,Android) 发起"根据信息查询好友/群"请求
 * @param data
 */
function seachFriendAndQunByApp(data) {
    if (isAndroid) {
        JavaScriptHandler.seachFriendAndQunByApp(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.seachFriendAndQunByApp.postMessage(JSON.stringify(data));
    }
}

/**
 * 根据信息查询好友/群反馈
 * @param res
 */
function seachFriendAndQunByAppBack(res) {
    console.log("根据信息查询好友/群反馈" + res)
    if (isiOS) {
        res = JSON.parse(res);
    }
    friendListVue.users = res.result.users;
    friendListVue.groups = res.result.groups;
    friendListVue.messages = res.result.messages;
}


// /**
//  * 查询好友结果反馈
//  * @param phone
//  */
// function seachFriendResByApp(res) {
//     console.log("查询好友结果反馈" + res)
//     if (isiOS) {
//         res = JSON.parse(res);
//     }
//     friendListVue.flist = [];
//     friendListVue.flist.push(res.result);
// }


/**
 * 向App(IOS,Android) 发起添加好友请求
 */
function addFriend(id, nickName, verifyMsg) {
    var data = {
        "friendUserId": id,
        "nickName": nickName,
        "verifyMsg": verifyMsg
    }
    console.log(data)
    if (isAndroid) {
        JavaScriptHandler.addFriend(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.addFriend.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取添加好友反馈
 * @param res
 */
function getFriendsByPhone(res) {
    console.log('获取添加好友反馈' + res)
    backHis();
}

/**
 * 向App(IOS,Android) 发起审核好友请求
 * @param id
 * @param nickName
 * @param verifyMsg
 * @param addStatus
 */
function applyFriendFun(id, nickName, verifyMsg, addStatus) {
    var data = {
        "friendUserId": id,
        "nickName": nickName,
        "verifyMsg": verifyMsg,
        "addStatus": addStatus
    }
    console.log(data)
    if (isAndroid) {
        JavaScriptHandler.applyFriendFun(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.applyFriendFun.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取审核好友反馈
 * @param res
 */
function getApplyFriendsByPhone(res) {
    console.log('获取审核好友反馈' + res)
    backHis();
}

/**
 * 向App(IOS,Android) 发起获取好友列表请求(addStatus = PASS)
 * @param addStatus
 */
function setContactFun(addStatus) {
    var data = {
        "addStatus": addStatus
    };
    console.log(data)
    if (isAndroid) {
        JavaScriptHandler.setContactFun(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.setContactFun.postMessage(JSON.stringify(data));
    }
}

/**
 * 向App(IOS,Android) 发起获取群列表请求(addStatus = PASS)
 * @param addStatus
 */
function setQunFun(addStatus) {
    var data = {
        "addStatus": addStatus
    };
    console.log(data)
    if (isAndroid) {
        JavaScriptHandler.setQunFun(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.setQunFun.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取好友列表反馈
 * @param res
 */
function getContactFun(res) {
    if (isiOS) {
        res = JSON.parse(res);
    }
    flistVue.flist = res.result;
}

/**
 * 关闭聊天窗体
 */
function closeChatWin() {
    if (isAndroid) {
        JavaScriptHandler.closeWinFun();
    } else if (isiOS) {
        window.webkit.messageHandlers.closeWinFun.postMessage('');
    }
}


/**
 * 向App(IOS,Android) 发起修改好友备注请求
 * @param data
 */
function fixFriend(data) {
    if (isAndroid) {
        JavaScriptHandler.fixFriend(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.fixFriend.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取修改好友备注反馈
 * @param res
 */
function fixFriendBack(res) {
    console.log('获取修改好友备注反馈' + res)
    backHis();
}


/**
 * 向App(IOS,Android) 发起消息列表请求
 */
function setMsgList() {
    if (isAndroid) {
        JavaScriptHandler.setMsgList();
    } else if (isiOS) {
        window.webkit.messageHandlers.setMsgList.postMessage('');
    }
}

/**
 * 获取消息列表反馈
 * @param res
 */
function getMsgList(res) {
    if (isiOS) {
        res = JSON.parse(res);
    }
    cflistVue.flist = res.result;
}

/**
 * 向App(IOS,Android)发起群聊记录请求
 */
function setGroupHis(gid) {
    var data = {
        "groupChatId": gid
    }

    if (isAndroid) {
        JavaScriptHandler.setGroupHis(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.setGroupHis.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取群聊记录
 * @param res
 */
function getGroupHis(res) {
    if (isiOS) {
        res = JSON.parse(res);
    }
    ulflistVue.chatList = res.result;
}

/**
 * 向App(IOS,Android) 发起“创建群组”请求
 */
function createQun() {
    if (isAndroid) {
        JavaScriptHandler.createQun();
    } else if (isiOS) {
        window.webkit.messageHandlers.createQun.postMessage('');
    }
}

/**
 * 获取创建群组反馈
 * @param res
 */
function getCreateQunBack(res) {
    console.log('获取创建群组反馈' + res)
    backHis();
}

/**
 * 向App(IOS,Android) 发起“申请加入群组”请求
 * @param groupChatId
 * @param verifyMsg
 */
function applyGroupFun(groupChatId, verifyMsg) {
    var data = {
        "groupChatId": groupChatId,
        "verifyMsg": verifyMsg
    };
    if (isAndroid) {
        JavaScriptHandler.applyGroupFun(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.applyGroupFun.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取申请加入群组反馈
 * @param res
 */
function getApplyGroup(res) {
    console.log('申请加入群组反馈' + res)
    backHis();
}

/**
 * 向App(IOS,Android) 发起“审核群成员”请求
 * @param data
 */
function verifyGroupFun(data) {
      if (isAndroid) {
        JavaScriptHandler.verifyGroupFun(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.verifyGroupFun.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取审核群成员反馈
 * @param res
 */
function verifyGroupBack(res) {
    console.log('申请加入群组反馈' + res)
    backHis();
}

/**
 * 向App(IOS,Android) 发起“邀请好友”请求
 * @param data
 */
function setInviteFriend(data) {
    if (isAndroid) {
        JavaScriptHandler.setInviteFriend(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.setInviteFriend.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取 邀请好友反馈
 * @param res
 */
function getInviteFriendBack(res) {
    console.log('邀请好友反馈' + res)
    backHis();
}

/**
 * 向App(IOS,Android) 发起“查找群”请求
 * @param data
 */
function seachQunFun(data) {
    if (isAndroid) {
        JavaScriptHandler.seachQunFun(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.seachQunFun.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取 查找群反馈
 * @param res
 */
function getSeachQunBack(res) {
    if (isiOS) {
        res = JSON.parse(res);
    }
    friendListVue.qlist = res.result;
}

/**
 * 向App(IOS,Android) 发起“根据群编号获取群主”请求
 * @param groupChatId
 */
function setGroupUserAdmin(groupChatId) {
    var data = {
        "groupChatId":groupChatId
    }
    if (isAndroid) {
        JavaScriptHandler.setGroupUserAdmin(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.setGroupUserAdmin.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取根据群编号获取群主反馈
 * @param res
 */
function getGroupUserAdminBack(res) {
    if (isiOS) {
        res = JSON.parse(res);
    }
    flistVue.groupAdmin = res.result;
}

/**
 * 向App(IOS,Android) 发起“根据群编号查询群成员”请求
 * @param groupChatId
 */
function setGroupMember(groupChatId){
    var data = {
        "groupChatId":groupChatId
    };
    if (isAndroid) {
        JavaScriptHandler.setGroupMember(JSON.stringify(data));
    } else if (isiOS) {
        window.webkit.messageHandlers.setGroupMember.postMessage(JSON.stringify(data));
    }
}

/**
 * 获取根据群编号查询群成员反馈
 * @param res
 */
function getGroupMemberBack(res) {
    if (isiOS) {
        res = JSON.parse(res);
    }
    flistVue.flist = res.result;
}
