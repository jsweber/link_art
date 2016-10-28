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
