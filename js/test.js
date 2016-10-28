/**
 * Created by hasee on 2016/10/29.
 */
$(function(){
    $("p").animate({fontSize:"50px"},2000,function(){
        $(this).html($(this).html()+ "<br/>动画结束");
    })
});
