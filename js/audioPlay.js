/**
 * Created by hasee on 2016/10/30.
 */
/*
* 音乐播放器脚本
* param：obj  其实就是指 document.querySelectorAll(".sound-comment")
*
* 对于批量audio标签的绑定ex：
window.addEventListener("load",function(){
     var audiosParent = document.querySelectorAll(".sound-comment");
     [].forEach.call(audiosParent,function(ap){
         new AudioPlay(ap);
     });
 },false);
*
* */
function AudioPlay(obj){
    this.audio = obj.getElementsByTagName("audio")[0];
    this.count = 0;
    this.time = 0;
    this.pause = true;
    this.timer = null;
    var self = this;
    this.audio.onloadedmetadata = function(){
        self.panel = obj.getElementsByClassName("time-panel")[0];
        self.audio.volume = 0.95;
        self.time = self.count = Math.floor(self.audio.duration);
        self.panel.innerHTML=self.count;
    }

    obj.addEventListener("click",function(){
        if(self.pause){
            self.audio.play();
            start();
            self.pause = false;
        }else{
            self.audio.pause();
            pause();
            self.pause = true;
        }

    },false);

    function start(){
        self.timer = setInterval(function(){
            if(0 >= self.count){
                clearInterval(self.timer);
                self.count = self.time;
                self.panel.innerHTML=self.count;
                self.pause = true;
            }
            self.panel.innerHTML = (self.count--);
        },1000);
    }

    function pause(){
        clearInterval(self.timer);
    }

}






