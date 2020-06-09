$(function(){
    $("#footer-meizu").load("./footer.html")
    let name = getCookie("username")
    $("#header-user").html(name)
    if(!name){
        location.href="./login.html"
    }
    $.ajax({
        type:"GET",
        url:"http://10.31.162.86/dest/php/getCart.php",
        data:{
            "name":name
        },
        success:function(data){
            data = JSON.parse(data)
            console.log(data)
            if(data.length==0){
                $("#is-goods").css({
                    display:"none"
                })
            }
            else {
                $("#no-goods").css({
                    display:"none"
                })
                $("#is-goods").css({
                    display:"block"
                })
                $.each(data,function(index,item){
                   let $clone = $(".goods-body-list:hidden").clone(true,true)
                   $clone.find(".goods-body-img").children().attr("src",item.goodsImg)
                   $clone.find(".goods-body-link").children().first().html(item.goodsName)
                   $clone.find(".goods-body-link").children().last().html(`${item.net} ${item.color} ${item.memory} ${item.package}`)
                   $clone.find(".cart-product-price").children().html(item.goodsPrice)
                   $clone.find(".num-text").val(item.count)
                   $clone.find(".cart-product-total").children().html((item.goodsPrice * item.count).toFixed(2))
                   $clone.css({
                       display:"flex"
                   })
                   $("#is-goods-body").append($clone)
                })
            }
        }
    })
}) 