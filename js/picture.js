function setPictureAttributes(picture) {
    var update_at_str = takeTimeApart(picture.created_at);
    picture.created_at = update_at_str.month + "-" + update_at_str.day + "," + update_at_str.year;

    return picture;
}

$(function() {
    var vm = new Vue({
        el: 'body',
        data: {
            picture: {images: {}}
        },
        ready:function() {
            $.ajax( {
                url:'https://private-anon-2eecc86b83-linkart.apiary-mock.com/gallerys／1',
                data:{},
                type:'get',
                async: true,
                cache:false,
                dataType:"json",
                success:function(data) {
                    vm.picture = setPictureAttributes(data);
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                    alert("异常！");
                }
            });

        }
    });
})