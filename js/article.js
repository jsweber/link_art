function getTempDate(data){
    var $temp = $("#tempDate");
    $temp.html(data);

    var result = {};
    var $h1s = $temp.find("h1");
    result.imgSrc = $temp.find("img").attr("src");
    result.text = $h1s.eq(1).html();
    return result;
}

function setArticleAttributes(article) {
    var comments = article.comments;
    for(var i = 0; i < comments.length; i++){
        var comment = comments[i];
        comment.time = getDateDiff(comment.created_at);
        var res = /^回复@(.*):/.exec(comment.content);
        comment.reply_to = res == null ? null : res[1];
        if (res !== null)
            comment.content = comment.content.substr(res[0].length);
    }

    var update_at_str = takeTimeApart(article.update_at);
    article.update_at = update_at_str.month + "-" + update_at_str.day + "," + update_at_str.year;

    var data = article.content;
    var r = getTempDate(data);

    $(".article-text").html(r.text);

    article.content = r;

    return article;
}

$(function() {

    var vm = new Vue({
        el: 'body',
        data: {
            article: {user: {}, comments: [{user:{}}], content: {}}
        },
        ready:function() {
            $.ajax( {
                url:'https://private-anon-2eecc86b83-linkart.apiary-mock.com/stories／1',
                data:{},
                type:'get',
                async: true,
                cache:false,
                dataType:"json",
                success:function(data) {
                    vm.article = setArticleAttributes(data);

                    vm.$nextTick(function () {
                        var audiosParent = document.querySelectorAll(".sound-comment");
                        [].forEach.call(audiosParent,function(ap){
                            new AudioPlay(ap);
                        });
                    });
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
//                        alert("异常！");
                }
            });

        }
    });
})

//    function  getTempDate(data){
//        var contentArr = [];
//        var $h1s = $temp.children("h1");
//
//        for(var i=0;i<$h1s.length;i++){
//            var $h1 = $h1s.eq(i);
//            var str = $h1.html();
//            if(str.indexOf("img")>0 && str.indexOf("src")>0){
//                contentArr.push({
//                    key:"img",
//                    content:$h1.find("img").attr("src")
//                });
//            }else{
//                contentArr.push({
//                    key:"text",
//                    content:$h1.html()
//                });
//            }
//        }
//        return contentArr;
//    }
