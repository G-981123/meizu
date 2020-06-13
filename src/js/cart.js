$(function () {
    $("#footer-meizu").load("./footer.html")
    let name = getCookie("username")
    $("#header-user").html(name)
    if (!name) {
        location.href = "./login.html"
    }
    $.ajax({
        type: "GET",
        url: "http://10.31.162.86/php/getCart.php",
        data: {
            "name": name
        },
        success: function (data) {
            data = JSON.parse(data)
            console.log(data.length)
            $("#goodsnum").html(`&nbsp;${data.length}&nbsp;`)
            if (data.length == 0) {
                $("#is-goods").css({
                    display: "none"
                })
            } else {
                $("#no-goods").css({
                    display: "none"
                })
                $("#is-goods").css({
                    display: "block"
                })
                $.each(data, function (index, item) {
                    let $clone = $(".goods-body-list:hidden").clone(true, true)
                    $clone.attr("data-id", `${item.goodsId}`)
                    $clone.find(".goods-body-img").children().attr("src", item.goodsImg)
                    $clone.find(".goods-body-link").children().first().html(item.goodsName)
                    $clone.find(".goods-body-link").children().last().html(`${item.net} ${item.color} ${item.memory} ${item.package}`)
                    $clone.find(".cart-product-price").children().html(item.goodsPrice)
                    $clone.find(".num-text").val(item.count)
                    $clone.find(".cart-product-total").children().html((item.goodsPrice * item.count).toFixed(2))
                    $clone.css({
                        display: "flex"
                    })
                    $("#is-goods-body").append($clone)
                })
                $(".goods-body-list:hidden").remove()
            }
        }
    })
    $(function () {
        //多选按钮
        //获取不是隐藏的选择按钮
        //或者渲染完后删除隐藏的元素
        //否则会影响全选事件
        $('.query-all').change('checked', function () {
            $('.query-one,.query-all').prop('checked', $(this).prop('checked'));
            $("#querynum").html($('.query-one:checked').length)
            if ($('.query-one:checked').length > 0) {
                let allprice = 0
                let oallprice = 0
                $.each($('.query-one:checked'), function (index, item) {
                    allprice = parseFloat(allprice)
                    oallprice = $(item).parent().parent().parent().find(".cart-product-total").children().html()
                    // console.log(oallprice)
                    oallprice = parseFloat(oallprice)
                    // console.log(oallprice)
                    allprice = allprice + oallprice
                    // console.log(allprice)
                    allprice = parseFloat(allprice).toFixed(2)
                    // console.log(allprice)
                })
                $("#goods-footer-right").find("i").html(allprice)
            } else {
                $("#goods-footer-right").find("i").html("0.00")
            }
        });
        $('.query-one').change('checked', function () {
            $("#querynum").html($('.query-one:checked').length)
            if ($('.query-one:checked').length > 0) {
                let allprice = 0
                let oallprice = 0
                $.each($('.query-one:checked'), function (index, item) {
                    allprice = parseFloat(allprice)
                    oallprice = $(item).parent().parent().parent().find(".cart-product-total").children().html()
                    // console.log(oallprice)
                    oallprice = parseFloat(oallprice)
                    // console.log(oallprice)
                    allprice = allprice + oallprice
                    // console.log(allprice)
                    allprice = parseFloat(allprice).toFixed(2)
                    // console.log(allprice)
                })
                $("#goods-footer-right").find("i").html(allprice)
            } else {
                $("#goods-footer-right").find("i").html("0.00")
            }
            // console.log($('.query-one:checked').length)
            // console.log($('.query-one').length-1)
            if ($('.query-one:checked').length === $('.query-one').length) {
                $('.query-all').prop('checked', true);
            } else {
                $('.query-all').prop('checked', false);
            }
        });
        //加减数量
        let flag = false
        $("#is-goods-body .goods-body-list").on("click", "input[type=button]", function () {
            let count = $(this).parent().children().eq(1).val()
            //获取商品id   Id
            //获取商品颜色  ocorlortype
            //获取商品内存  omemorytype
            //获取商品套餐  opackagetype
            // 名字全局已经获取  username
            //数量已经获取  onum
            // console.log($(this))
            if ($(this).prop("class") == "num-pre") {
                if (flag == false) {
                    flag = true
                    $(this).parent().children().eq(2).prop("disabled", false)
                    if (count >= 2) {
                        count--;
                        let bbbarr = $(this).parent().parent().parent().find(".link-bottom").html().split(" ")
                        $.ajax({
                            type: "GET",
                            url: "http://10.31.162.86/php/updatecartCount.php",
                            data: {
                                "Id": $(this).parent().parent().parent().attr("data-id"),
                                "ocorlortype": bbbarr[1],
                                "omemorytype": bbbarr[2],
                                "opackagetype": bbbarr[3],
                                "username": name,
                                "onum": count,
                            },
                            success: data => {
                                if (data == 1) {
                                    alert("修改成功")
                                    $(this).parent().children().eq(1).val(function () {
                                        return count;
                                    })
                                    if (count <= 1) {
                                        $(this).prop("disabled", true)
                                    }
                                    let price = $(this).parent().parent().parent().find(".cart-product-price").children().html() * count
                                    price = parseFloat(price).toFixed(2)
                                    $(this).parent().parent().parent().find(".cart-product-total").children().html(price)
                                    flag = false
                                } else if (data == 0) {
                                    alert("失败")
                                }
                            }
                        })
                    } else {
                        return false
                    }
                }
            } else if ($(this).prop("class") == "num-add") {
                if(flag==false){
                    flag =true
                    $(this).parent().children().eq(0).prop("disabled", false)
                if (count <= 9) {
                    count++;
                    let bbbarr = $(this).parent().parent().parent().find(".link-bottom").html().split(" ")
                    $.ajax({
                        type: "GET",
                        url: "http://10.31.162.86/php/updatecartCount.php",
                        data: {
                            "Id": $(this).parent().parent().parent().attr("data-id"),
                            "ocorlortype": bbbarr[1],
                            "omemorytype": bbbarr[2],
                            "opackagetype": bbbarr[3],
                            "username": name,
                            "onum": count,
                        },
                        success: data => {
                            if (data == 1) {
                                alert("修改成功")
                                $(this).parent().children().eq(1).val(function () {
                                    return count;
                                })
                                if (count >= 10) {
                                    $(this).prop("disabled", true)
                                }
                                let price = $(this).parent().parent().parent().find(".cart-product-price").children().html() * count
                                price = parseFloat(price).toFixed(2)
                                $(this).parent().parent().parent().find(".cart-product-total").children().html(price)
                                flag =false
                            } else if (data == 0) {
                                alert("失败")
                            }
                        }
                    })
                } else {
                    return false;
                }
                }

            }
        })
        let bianjiflag =false
        // 点击显示删除按钮
        $("#bianji").on("click",function(){
            if(bianjiflag==false){
                bianjiflag =true
                $(".delone").html("X")
                // console.log($(".cart-product-ctrl").children())
            }
            else if(bianjiflag==true) {
                $(".delone").html("--")
                bianjiflag=false
            }
        })
        //点击删除按钮
        $("#is-goods-body .goods-body-list").on("click","span[class=delone]",function(){
            if( $(".delone").html()=="X"){
                let cmparr= $(this).parent().parent().parent().find(".link-bottom").html().split(" ")
                console.log($(this).parent().parent().parent().attr("data-id"))
                $.ajax({
                    type: "GET",
                    url: "http://10.31.162.86/php/detachcart.php",
                    data: {
                        "username":name,
                        "Id":$(this).parent().parent().parent().attr("data-id"),
                        "ocorlortype":cmparr[1],
                        "omemorytype":cmparr[2],
                        "opackagetype":cmparr[3]
                    },
                    success:data=>{
                     if(data==1){
                        alert("删除成功")
                        $(this).parent().parent().parent().remove()
                        let res = /\d+/
                        let numarr = $("#goodsnum").html().match(res)
                        let allnum = numarr[0]-1
                        $("#goodsnum").html(`&nbsp;${allnum}&nbsp;`)
                        if(allnum==0){
                            $("#is-goods").css({display:"none"})
                            $("#no-goods").css({display:"flex"})
                        }
                        
                     }
                     else {
                        alert("失败")
                     }
                    }
                })
            }
            else {
                return false
            }
        })
        //删除全部商品
        $("#del").on("click",function(){
            // console.log($('.query-one:checked'))
            $.each($('.query-one:checked'),function(index,item){
                let cmparr= $(this).parent().parent().parent().find(".link-bottom").html().split(" ")
                $.ajax({
                    type: "GET",
                    url: "http://10.31.162.86/php/detachcart.php",
                    data: {
                        "username":name,
                        "Id":$(this).parent().parent().parent().attr("data-id"),
                        "ocorlortype":cmparr[1],
                        "omemorytype":cmparr[2],
                        "opackagetype":cmparr[3]
                    },
                    success:data=>{
                     if(data==1){
                        if($(this).length==index+1){
                            alert("删除成功")
                        }
                        $(this).parent().parent().parent().remove()
                        let res = /\d+/
                        let numarr = $("#goodsnum").html().match(res)
                        let allnum = numarr[0]-1
                        $("#goodsnum").html(`&nbsp;${allnum}&nbsp;`)
                        $("#goods-footer-right").find("i").html("0.00")
                        if(allnum==0){
                            $("#is-goods").css({display:"none"})
                            $("#no-goods").css({display:"flex"})
                        }
                     }
                     else {
                        alert("失败")
                     }
                    }
                })
            })
        })
    })
})