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
        $changePageBtn=$(".change-page"),
        pageIndex=0,
        lock=true,
        isVideoEnd=true,
        scrollStepDis=100,
        scrollTime=200,
        PAGEH = win.innerHeight || document.body.offsetHeight,
        asideText=["首页","	艺术家","商业","社群","应用"],
        easing ="swing"
        ;

    init();

/*事件绑定*/
    //这个往下的按钮
    $changePageBtn.on("click",function(){
        videoEnd();
        if(pageIndex==4) return;
        pageIndex++;
        pageScroll(pageIndex);
        asideScroll(pageIndex);

    });

    $(".left-top-logo").on("click",function(){
        pageIndex=0;
        pageScroll(pageIndex);
        asideScroll(pageIndex);
    });

    $scrollText.on("click",function(){
        pageIndex=$(this).index();
        pageScroll(pageIndex);
        asideScroll(pageIndex);
    });

    $(".download .close").on("click",function(){
        $(".download").hide();
    });

    $(".land .close").on("click",function(){
        $(".land").hide();
    });

    $(".fpassword .close").on("click",function(){
        $(".fpassword").hide();
    });

    $(".login-in-btn").on("click",function(){
        $(".download").show();
    });

    $(".land-in-btn").on("click",function(){
        $(".land").show();
    });

    $(".land .go-login").on("click",function(){
        $(".land").hide();
        $(".download").show();
    });

    $(".forget-passwd-btn").on("click",function(){
        $(".land").hide();
        $(".fpassword").show();
    });

    //密码查看
    $(".land .look-btn").on("click",function(){
        var $passwd= $(".land .passwd-text");
        var selectState = {
            password:"url(img/close_eye.png)",
            text:"url(img/look_password_icon.png)"
        };
        var type = $passwd.attr("type") =="text"? "password" : "text";
        $passwd.attr("type",type);
        $(this).css("background-image",selectState[type]);
    });
    $(".fpassword .look-btn").on("click",function(){
        var $passwd= $(".fpassword .passwd-text");
        var selectState = {
            password:"url(img/close_eye.png)",
            text:"url(img/look_password_icon.png)"
        };
        var type = $passwd.attr("type") =="text"? "password" : "text";
        $passwd.attr("type",type);
        $(this).css("background-image",selectState[type]);
    });
    //倒计时
    var time = 30;
    var $showTime = $(".show-time");
    var $span = $(".show-time span");
    $(".fpassword .get-athe-code").on("click",function(){
        var $this = $(this);
        $this.hide();
        var count = time;
        $showTime.show();
        var timer = setInterval(function(){
            if(count<=0){
                clearInterval(timer);
                $(".reget-athe-code").show();
                $showTime.hide();
                $span.html(30);
                return;
            }
            count--;
            $span.html(count);
        },1000);
    });

    $(".reget-athe-code").on("click",function(){
        var $this = $(this);
        $this.hide();
        var count = time;
        $showTime.show();
        var timer = setInterval(function(){
            if(count<=0){
                clearInterval(timer);
                $this.show();
                $showTime.hide();
                $span.html(30);
                return;
            }
            count--;
            $span.html(count);
        },1000);
    });
/*  交互封装 */
    function pageScroll(index){
        lock=false;
        $wrapper.animate({top:(-PAGEH*pageIndex)+'px'},scrollTime,easing,function(){
            lock=true;
        })
    }
    function asideScroll(index){
        $scrollBlock.animate({top:(scrollStepDis*pageIndex)+'px'},scrollTime,easing,function(){
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
            videoEnd();
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

    $wrapper.mousewheel(function(event, delta) {
        loghandle(event, delta);
    });

    function videoDeal(){
        var video = $("#video")[0];
        //当浏览器能开始播放当前缓存时回调，参考http://www.w3school.com.cn/tags/av_event_canplay.asp
        addEvent(video,"canplay",function(){
            this.play();
        });
        addEvent(video,"error",videoEnd);
        addEvent(video,"ended",videoEnd);
    }
    function videoEnd(){
        if(isVideoEnd){
            isVideoEnd = false;
            var fadeinTime = 1500;
            $(".video-wrapper").hide();
            $aslideWrapper.animate({opacity:1},fadeinTime);
            $('.login-wrapper').animate({opacity:1},fadeinTime);
            $('.fadein-bg').animate({opacity:1},fadeinTime-300);
        }
    }

    function init(){
        $wrapper.css("height",PAGEH*5);
        $slide.css({
            height:PAGEH,
        });
        videoDeal();

    }
});

//工具函数
function addEvent(obj,type,fn){
    if(document.addEventListener){
        obj.addEventListener(type,fn,false);
    }else{
        obj.attached("on"+type,function(e){
            fn.call(obj,window.event);
        });
    }
}

