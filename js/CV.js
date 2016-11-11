/**
 * Created by hasee on 2016/11/2.
 */
function setResumeAttributes(resume) {

    // for(var i = 0; i < resume.experiences.personal.length; i++){
    //     var p = resume.experiences.personal[i];
    //     p.start = takeTimeApart(p.start).year + "年";
    //     p.end = takeTimeApart(p.end).year + "年";
    // }
    //
    // for(i = 0; i < resume.experiences.exhibition.length; i++){
    //     var exhi = resume.experiences.exhibition[i];
    //     exhi.start = takeTimeApart(exhi.start).year;
    //     exhi.end = takeTimeApart(exhi.end).year;
    // }

    var date = takeTimeApart(resume.video.date);
    resume.video.date = date.day + "/" + date.month + "/" + date.year;

    var artworks = resume.artworks;
    for(var i = 0; i < artworks.length; i++){
        var comment = artworks[i].comment;
        comment.time = getDateDiff(comment.created_at);
        var res = /^回复@(.*):/.exec(comment.content);
        comment.reply_to = res == null ? null : res[1];
        if (res !== null)
            comment.content = comment.content.substr(res[0].length);

        if(comment.user.verified){
            comment.user.v_image = comment.user.v_type == 1 ? 'img/v_small_big.png' : 'img/v_blue_small.png';
        }

    }

    return resume;
}

$(function() {

    var vm = new Vue({
        el: 'body',
        data: {
            resume: {profile:{}, experiences: [], artworks: [], artwork_groups: [], video: {}, artists:{users:[]}}
        },
        ready:function() {
            $.ajax( {
                url:'https://private-anon-2eecc86b83-linkart.apiary-mock.com/resumes／1',
                data:{},
                type:'get',
                async: true,
                cache:false,
                dataType:"json",
                success:function(data) {
                    vm.resume = setResumeAttributes(data);
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


    scrollTo("html")
});

function scrollTo(ele){
    $("html,body").stop(true);
    $("html,body").animate(
        {scrollTop: $(ele).offset().top}, 1000
    );
}

function changeNavTab(id){
    var idList = ["profile", "cv-experience", "work-list", "pic-list", "video-part", "describle-list", "other-work-list"];
    for(var i = 0; i < idList.length; i++){
        var item = idList[i];
        var element = $("#" + item);
        if(id == item){
            element.removeClass("unselected");
            element.addClass("selected");
        }else{
            element.removeClass("selected");
            element.addClass("unselected");
        }
    }

    scrollTo("." + id);

}

