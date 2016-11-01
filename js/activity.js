/**
 * Created by hasee on 2016/11/2.
 */
function setActivityAttributes(activity) {
    var comments = activity.comments;
    for(var i = 0; i < comments.length; i++){
        var comment = comments[i];
        comment.time = getDateDiff(comment.created_at);
        var res = /^回复@(.*):/.exec(comment.content);
        comment.reply_to = res == null ? null : res[1];
        if (res !== null)
            comment.content = comment.content.substr(res[0].length);

    }

    var update_at_str = takeTimeApart(activity.update_at);
    activity.update_at = update_at_str.month + "-" + update_at_str.day + "," + update_at_str.year;

    var end_str = takeTimeApart(activity.end);
    activity.end = end_str.year + "年" + end_str.month + "月" + end_str.day + "日";

    return activity;
}

$(function() {

    var vm = new Vue({
        el: 'body',
        data: {
            activity: {user:{}, comments: [{user:{}}]}
        },
        ready:function() {
            $.ajax( {
                url:'https://private-anon-2eecc86b83-linkart.apiary-mock.com/activities／1',
                data:{},
                type:'get',
                async: true,
                cache:false,
                dataType:"json",
                success:function(data) {
                    vm.activity = setActivityAttributes(data);
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