function setCommentAttributes(certain_comment) {
    var comment =  certain_comment.comment;

    if(comment.user.verified){
        comment.user.v_image = comment.user.v_type == 1 ? 'img/v_yellow_big.png' : 'img/v_blue_big.png';
    }

    var time_part = takeTimeApart(comment.created_at);
    comment.created_at = time_part.month + "-" + time_part.day + "," + time_part.year;

    var replies = comment.reply;
    for(var i = 0; i < replies.length; i++){
        var reply = replies[i];
        reply.time = getDateDiff(reply.created_at);
        var res = /^回复@(.*):/.exec(reply.content);
        reply.reply_to = res == null ? null : res[1];
        if (res !== null)
            reply.content = reply.content.substr(res[0].length);

        if(reply.user.verified){
            reply.user.v_image = reply.user.v_type == 1 ? 'img/v_yellow_small.png' : 'img/v_blue_small.png';
        }

        var time_part = takeTimeApart(reply.created_at);
        reply.created_at = time_part.month + "-" + time_part.day + "," + time_part.year;
    }

    var update_at_str = takeTimeApart(certain_comment.update_at);
    certain_comment.update_at = update_at_str.month + "-" + update_at_str.day + "," + update_at_str.year;

    var yesr_str = takeTimeApart(certain_comment.year);
    certain_comment.year = yesr_str.year + "年" + yesr_str.month + "月" + yesr_str.day + "日";

    if(certain_comment.sell_type == 0){
        certain_comment.sell_type = "出售";
    }else if(certain_comment.sell_type == 1){
        certain_comment.sell_type = "已售";
    }else{
        certain_comment.sell_type = "非卖品";
    }

    return certain_comment;
}

$(function() {

    var vm = new Vue({
        el: 'body',
        data: {
            certain_comment: {user:{}, pictures: [{url: ''}], comment: {user:{}, reply:[{user:{}} ] }}
        },
        ready:function() {
            $.ajax( {
                url:'https://private-anon-2eecc86b83-linkart.apiary-mock.com/comments/1',
                data:{},
                type:'get',
                async: true,
                cache:false,
                dataType:"json",
                success:function(data) {
                    vm.certain_comment = setCommentAttributes(data);

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
                }
            });

        }
    });
})