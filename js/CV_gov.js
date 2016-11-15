/**
 * Created by hasee on 2016/11/3.
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
    for(i = 0; i < artworks.length; i++){
        var comment = artworks[i].comment;
        comment.time = getDateDiff(comment.created_at);
        var res = /^回复@(.*):/.exec(comment.content);
        comment.reply_to = res == null ? null : res[1];
        if (res !== null)
            comment.content = comment.content.substr(res[0].length);

        if(comment.user.verified){
            comment.user.v_image = comment.user.v_type == 1 ? 'img/v_yellow_big.png' : 'img/v_blue_big.png';
        }
    }

    var artists = resume.artists.users;
    for(i = 0; i < artists.length; i++){
        var artist = artists[i];
        if(artist.verified){
            artist.v_image = artist.v_type == 1 ? 'img/v_yellow_big.png' : 'img/v_blue_big.png';
        }
    }

    return resume;
}

var idList = [];
var offsetTopList = [];
var offsetTopDict = {};

$(function() {

    var vm = new Vue({
        el: 'body',
        data: {
            resume: {profile:{}, experiences: [], artworks: [], artwork_groups: [], video: {}, artists:{users:[]}, images:[{objects:[]}, {}]}
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

                    if(data.profile)
                        idList.push("profile");
                    if(data.experiences)
                        idList.push("cv-experience");
                    if(data.artworks)
                        idList.push("work-list");
                    if(data.artwork_groups)
                        idList.push("pic-list");
                    if(data.video)
                        idList.push("video-part");
                    if(data.artists)
                        idList.push("describle-list");
                    if(data.news)
                        idList.push("other-work-list");

                    vm.$nextTick(function () {
                        var audiosParent = document.querySelectorAll(".sound-comment");
                        [].forEach.call(audiosParent,function(ap){
                            new AudioPlay(ap);
                        });

                        var videoWrapper = $(".video-wrapper");
                        videoWrapper.css("height", videoWrapper.width() * 9.0 / 16.0 + "px");

                        onDocumentScroll();
                        scrollTo("html");
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
});


function scrollTo(ele){
    $("html,body").stop(true);
    $(document).unbind('scroll');
    $("html,body").animate(
        {scrollTop: $(ele).offset().top - parseFloat($(ele).css("margin-top"))}, 1000, function(){ setOnDocumentScrollEvent(); }
    );
}

function changeSideNavTab(id){
    for(var i = 0; i < idList.length; i++){
        var item = idList[i];
        var element = $("#" + item);
        if(id == item){
            element.removeClass("unselected");
            element.addClass("selected");
            element.find("img").attr("src", "img/" + item + "_black.png");
        }else{
            element.removeClass("selected");
            element.addClass("unselected");
            element.find("img").attr("src", "img/" + item + "_white.png");
        }
    }
}

function changeNavTab(id){
    changeSideNavTab(id);
    scrollTo("." + id);
}

function setOnDocumentScrollEvent(){
    $(document).on("scroll",function(){
        var scrollTop = document.body.scrollTop;
        var id = inWhichArea(scrollTop, offsetTopList, idList);
        changeSideNavTab(id);
    })
}

function onDocumentScroll(){
    for(var i = 0; i < idList.length; i++){
        var ele = $("." + idList[i]);
        var offsetTop = ele.offset().top - parseFloat(ele.css("margin-top"));
        offsetTopList.push(offsetTop);
        offsetTopDict[offsetTop] = idList[i];
    }
    offsetTopList = offsetTopList.sort(function(a,b){return b - a});

    setOnDocumentScrollEvent();
}

function inWhichArea(scrollTop){
    for(var i = 0; i < offsetTopList.length; i++)
        if(scrollTop >= offsetTopList[i] - 5)  break;

    return offsetTopDict[offsetTopList[i]];
}