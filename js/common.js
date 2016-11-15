/**
 * Created by Administrator on 2016/7/11.
 */
(function () {
    var df_width = 320, df_dpr = 1, df_fs = 20, win = window, doc = document, html = doc.getElementsByTagName('html')[0];
    html.setAttribute('data-dpr', win.devicePixelRatio);
    html.setAttribute('style', 'font-size:' + (doc.documentElement.clientWidth / df_width * df_fs) + 'px');
})();

function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}


// following functions is common utilities
//

function getPara(paraName) {
    var urlPara = location.search;
    var reg = new RegExp("[&|?]" + paraName + "=([^&$]*)", "gi");
    var a = reg.test(urlPara);
    return a ? RegExp.$1 : null;
};

/*
 * addQuery("www.x.com?a=1&b=2&uid=132456","uid","newuid") ==> "www.x.com?a=1&b=2&uid=newuid"
 * addQuery("www.x.com?a=1&b=2","uid","newuid") ==> "www.x.com?a=1&b=2&uid=newuid"
 */
function addQuery(url, keyName, value) {
    if (arguments.length < 3) return url;
    var pos = url.indexOf('?');
    if (pos == -1) return url + '?' + keyName + '=' + value;
    var pathString = url.substring(0, pos);
    var queryString = url.substring(pos + 1);
    if (queryString === "") return url;

    var obj = query2obj(queryString);
    obj[keyName] = value;
    return pathString + "?" + obj2query(obj);
}

/*
 * obj2query({a:1,b:2}) ==> "a=1&b=2"
 */
function obj2query(obj) {
    var s = "";
    for (kv in obj) {
        if (s === "") s += kv + "=" + obj[kv];
        else s += "&" + kv + "=" + obj[kv];
    }
    return s;
}

/*
 * query2obj("a=1&b=2") ==> {a:1,b:2}
 */
function query2obj(queryString) {
    var obj = new Object();
    var strs = queryString.split("&");
    for (var i = 0; i < strs.length; i++) {
        obj[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
    return obj;
}

// UTC时间格式：ISO 8601扩展格式为： YYYY-MM-DDTHH:mm:ss.sssZ
// 这个是国际标准的时间格式
function takeTimeApart(time){
    var arr = time.split("T");
    var date_str = arr[0].split("-");
    var time_str = arr[1].split(":");
    return {year: date_str[0], month: date_str[1], day: date_str[2],
        hour: time_str[0], minute: time_str[1], second: time_str[2].substr(0,2)}
}

// 2014/05/08 00:22:11
function getDateDiff(dateTime){
    var time_part = takeTimeApart(dateTime);
    var time_str = time_part.year + "-" + time_part.month + "-" + time_part.day + " " + time_part.hour + ":" + time_part.minute + ":" + time_part.second;
    var dateTimeStamp = new Date(time_str).getTime();

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var year = month * 12;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if ( diffValue < 0) { return; }
    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var result = "";
    if(yearC >= 1){
        result = parseInt(yearC) + "年前";
    }
    else if(monthC >= 1){
        result = parseInt(monthC) + "月前";
    }
    else if(weekC >= 1){
        result = parseInt(weekC) + "周前";
    }
    else if(dayC >= 1){
        result = parseInt(dayC) +"天前";
    }
    else if(hourC >= 1){
        result = parseInt(hourC) +"小时前";
    }
    else if(minC >= 1){
        result = parseInt(minC) +"分钟前";
    }else
        result = "刚刚";
    return result;
}

// 显示对话框
function showModalDialog(){
    var modalDialog = $(".modal-dialog");
    modalDialog.css("top", document.body.scrollTop + "px");
    $("body").attr("onmousewheel", "return false;");
    modalDialog.bind("touchmove",function(event) { event.preventDefault(); }, false);
    modalDialog.show();
}

// 关闭对话框
function closeModalDialog(){
    var modalDialog = $(".modal-dialog");
    $("body").attr("onmousewheel", "return true;");
    modalDialog.unbind("touchmove");
    modalDialog.hide();
}

