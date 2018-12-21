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


function scrollToEnd() {//滚动到底部
    const h = 80 * ulflistVue.chatList.length + 1000;
    $('ul.ulflist').animate({
        scrollTop: h
    })
}


