/**
 * Created by hasee on 2016/11/2.
 */
function setActivityAttributes(work) {
    var comments = work.comments;
    for(var i = 0; i < comments.length; i++){
        var comment = comments[i];
        comment.time = getDateDiff(comment.created_at);
        var res = /^回复@(.*):/.exec(comment.content);
        comment.reply_to = res == null ? null : res[1];
        if (res !== null)
            comment.content = comment.content.substr(res[0].length);

    }

    var update_at_str = takeTimeApart(work.update_at);
    work.update_at = update_at_str.month + "-" + update_at_str.day + "," + update_at_str.year;

    var yesr_str = takeTimeApart(work.year);
    work.year = yesr_str.year + "年" + yesr_str.month + "月" + yesr_str.day + "日";

    if(work.sell_type == 0){
        work.sell_type = "出售";
    }else if(work.sell_type == 1){
        work.sell_type = "已售";
    }else{
        work.sell_type = "非卖品";
    }

    return work;
}

$(function() {

    var vm = new Vue({
        el: 'body',
        data: {
            work: {user:{}, pictures: [{url: ''}], comments: [{user:{}}]}
        },
        ready:function() {
            $.ajax( {
                url:'https://private-anon-2eecc86b83-linkart.apiary-mock.com/artworks／1',
                data:{},
                type:'get',
                async: true,
                cache:false,
                dataType:"json",
                success:function(data) {
                    vm.work = setActivityAttributes(data);

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