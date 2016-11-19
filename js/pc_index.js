/**
 * Created by hasee on 2016/11/19.
 */
$(function(){
    var doc = document,
        win = window,
        $wrapper = $(".slide-wrapper"),
        $slide = $(".slide"),
        $aslideWrapper = $(".aslide-wrapper"),
        $scrollBlock = $(".scroll-block"),
        $scrollText = $(".scroll-text"),
        $dob = $(".dob"),
        pageIndex=0,
        lock=true,
        PAGEH = win.innerHeight || document.body.offsetHeight,
        asideText=["首页","	艺术家","商业","社群","应用"],
        scrollTime=300,
        easing ="swing"
        ;

    init();
    function pageScroll(index){
        lock=false;
        $wrapper.animate({top:(-PAGEH*pageIndex)+'px'},scrollTime,easing,function(){
            lock=true;
        })
    }
    function asideScroll(index){
        $scrollBlock.animate({top:(100*pageIndex)+'px'},scrollTime,easing,function(){
            $scrollBlock.html(asideText[index]);
            $dob.css("opacity",1);
            if(index>0){
                $dob.eq(index-1).css("opacity",0);
            }
            if(index <4){
                $scrollText.eq(index).children(".dob").css("opacity",0);
            }
        })
    }


    var loghandle = function(event, delta) {
        if(lock){
            if (delta > 0){
                if(pageIndex==0){
                    pageIndex=0;
                }else{
                    pageIndex--;
                }
            }else if(delta < 0){
                if(pageIndex==4){
                    pageIndex=4;
                }else{
                    pageIndex++;
                }
            }
            pageScroll(pageIndex);
            asideScroll(pageIndex);
        }
    };

    function videoEnd(){
        $video = $("#video");

    }

    function init(){
        $wrapper.css("height",PAGEH*5);
        $slide.css({
            height:PAGEH,
        });
        doc.querySelector(".video_source").addEventListener("load",function(){
            console.log(123);
        },false)

    }
    $(document).mousewheel(function(event, delta) {
            loghandle(event, delta);
        });
});

//工具函数
