$(function () {
    $("#header-meizu").load("./header.html", function () {
        hover()
    })
    $("#footer-meizu").load("./footer.html")
    let Id = location.search
    Id = Id.split("=")[1]
    console.log(Id)
    let $navBox = $("#fastnav-abox")
    let $bigimg = $("#bigimg")
    let $minimg = $("#buttom-img-box")
    let $rowright = $("#row-right")
    let $title = $("title")
    let $showbox = $("#showbox")
    let $cartbtn = $("#addCartBtn")
    let $gocart = $("#gocart")
    //顶部悬浮
    $(window).scroll(function () {
        let $top = $(window).scrollTop();
        let $box = $('#fastnav-abox')
        if ($top >= 82) {
            $box.css({
                position: "fixed",
                top: 0,
                borderBottom: "none !important"
            })
        } else {
            $box.css({
                position: "relative",
                borderBottom: "1px solid #dedede !important;"
            })
        }
    })
    $.ajax({
        type: "GET",
        url: "http://10.31.162.86/dest/php/getdetails.php",
        data: {
            "Id": Id
        },
        success: function (data) {
            $("#property-num").css({display:"block"})
            $("#property-buy").css({display:"block"})
            data = JSON.parse(data)
            // console.log(data)
            let colorarr = data.goodsColor.split(",")
            // console.log(colorarr)
            let colorstr = ``
            $.each(colorarr, function (index, item) {
                if (item != '' && index == 0) {
                    colorstr += `<a href="javascript:;" class="active">${item}</a>`
                } else if (item != '' && index > 0) {
                    colorstr += `<a href="javascript:;">${item}</a>`
                }
            })
            // console.log(colorstr)
            let memoryarr = data.goodsMemory.split(",")
            let memorystr = ``
            $.each(memoryarr, function (index, item) {
                if (item != '' && index == 0) {
                    memorystr += `<a href="javascript:;" class="active">${item}</a>`
                } else if (item != '') {
                    memorystr += `<a href="javascript:;">${item}</a>`
                }
            })
            let packagearr = data.goodsPackage.split(",")
            let packagestr = ``
            $.each(packagearr, function (index, item) {
                if (item != '' && index == 0) {
                    packagestr += `<a href="javascript:;" class="active">${item}</a>`
                } else if (item != '') {
                    packagestr += `<a href="javascript:;">${item}</a>`
                }
            })

            // console.log(data.goodsminImg)
            let minimgarr = data.goodsminImg.split(",")
            let minimgstr = ``
            // console.log(minimgarr)
            $.each(minimgarr, function (index, item) {
                if (item != '') {
                    minimgstr += ` 
                            <li>
                                <a href="javascript:;">
                                    <img src=${item} alt="">
                                </a>
                            </li>`
                }
            })
            // console.log(minimgstr)
            let nav = `
            <div id="fastnav-box">
                <span>${data.goodsName}</span>
                <ul>
                    <li><a href="javascript:;">概述</a></li>
                    <li><a href="javascript:;" class="clear_b">参数</a></li>
                </ul>
            </div>
            `
            let bigimgstr = `
            <a href="javascpit:;">
                <img id="bigrdimg" src=${data.goodsImg} alt="">
            </a>`
            let rightbox = `
            <div id="property-hd">
            <h1>${data.goodsName}</h1>
            <p>${data.goodsDesc}</p>
        </div>
        <div id="property-sell">
            <div>
                <small>￥</small>
                <span>${data.goodsPrice}</span>
            </div>
            <dl class="clear_fix">
                <dt>
                    <span>加价购</span>
                </dt>
                <dd>
                    <span>另加<em>29</em>元起，即可换购超值商品</span>
                    <a href="#">立即加购 ></a>
                </dd>
            </dl>
        </div>
        <div id="property-service">
            <dl class="clear_fix">
                <dt><span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span></dt>
                <dd>
                    <span>花呗分期</span>
                    <span>顺丰发货</span>
                    <span>七天无理由退货(激活后不支持)</span>
                </dd>
            </dl>
            <dl class="clear_fix">
                <dt><span>配送服务</span></dt>
                <dd>
                    <div>广东 广州市</div>
                </dd>
            </dl>
        </div>
        <hr>
        <div id="property-set">
            <dl class="clear_fix">
                <dt>网络类型</dt>
                <dd class="clear_fix nettype">
                    <a href="javascript:;" class="active">全网通公开版</a>
                </dd>
            </dl>
            <dl class="clear_fix">
                <dt>颜色分类</dt>
                <dd class="clear_fix colortype">
                ${colorstr}
                </dd>
            </dl> 
            <dl class="clear_fix">
                <dt>内存容量</dt>
                <dd class="clear_fix memorytype">
                ${memorystr}
                </dd>
            </dl>
            <dl class="clear_fix">
                <dt>选择套餐</dt>
                <dd class="clear_fix packagetype">
                ${packagestr}
                </dd>
            </dl>
        </div>
            `
            $navBox.html(nav)
            $bigimg.prepend(bigimgstr)
            $minimg.html(minimgstr)
            $rowright.prepend(rightbox)
            $title.html(`${data.goodsName}-魅族商城`)
            //图片切换
            $(function () {
                $("#buttom-img-box").on("click", "li", function () {
                    let b = $(this).children().find("img").attr("src")
                    //    console.log(b)
                    $("#bigrdimg").attr("src", `${b}`)
                })
                $(".colortype").on("click", "a", function () {
                    $(this).siblings().removeClass("active")
                    $(this).addClass("active")
                })
                $(".memorytype").on("click", "a", function () {
                    $(this).siblings().removeClass("active")
                    $(this).addClass("active")
                })
                $(".packagetype").on("click", "a", function () {
                    $(this).siblings().removeClass("active")
                    $(this).addClass("active")
                })
                //加购物车
                $cartbtn.on("click", function () {
                    // console.log($(".nettype .active").val())
                    // console.log($(".colortype").children().has("active").val())
                    // console.log($(".colortype").find(".active").val())
                    // console.log($(".colortype").find(".active").html())
                    let onettype = $(".nettype").find(".active").html()
                    let ocorlortype = $(".colortype").find(".active").html()
                    let omemorytype = $(".memorytype").find(".active").html()
                    let opackagetype = $(".packagetype").find(".active").html()
                    let onum = $("#goodsCount").val()
                    let username = getCookie("username")
                    $.ajax({
                        type: "GET",
                        url: "http://10.31.162.86/dest/php/setCart.php",
                        data: {
                            "username": username,
                            "Id": Id,
                            "onum": onum,
                            "ocorlortype": ocorlortype,
                            "onettype": onettype,
                            "omemorytype": omemorytype,
                            "opackagetype": opackagetype

                        },
                        success: function (data) {
                            if (data == 1) {
                                $gocart.css({
                                    display: "block"
                                })
                                setTimeout(function () {
                                    $gocart.css({
                                        display: "none"
                                    })
                                }, 6000)
                            } else {
                                alert("添加失败")
                            }
                        }
                    })
                })
            })
        }
    })
    //按钮隐藏
    $showbox.hover(function () {
        $("#imgbtnleft").stop(true).animate({
            opacity: 1
        })
        $("#imgbtnright").stop(true).animate({
            opacity: 1
        })
    }, function () {
        $("#imgbtnleft").stop(true).animate({
            opacity: 0
        })
        $("#imgbtnright").stop(true).animate({
            opacity: 0
        })
    })
    //小图片滑动
    let flag = true
    $("#imgbtnleft").on("click", function () {
        $("#imgbtnright").prop("disabled", false)
        if (flag) {
            flag = false
            let $left = $("#buttom-img-box").position().left
            if ($left >= 0) {
                $(this).prop("disabled", true)
            } else {
                $left = $left + 130
                $("#buttom-img-box").stop(true).animate({
                    left: `${$left}`
                }, function () {
                    if ($("#buttom-img-box").position().left >= 0) {
                        $("#imgbtnleft").prop("disabled", true)
                    }
                    flag = true
                })

            }
        }
    })
    $("#imgbtnright").on("click", function () {
        $("#imgbtnleft").prop("disabled", false)
        if (flag) {
            flag = false
            let $right = $("#buttom-img-box").position().left
            if ($right <= -260) {
                $(this).prop("disabled", true)
            } else {
                $right = $right - 130
                $("#buttom-img-box").stop(true).animate({
                    left: `${$right}`
                }, function () {
                    if ($("#buttom-img-box").position().left <= -260) {
                        $("#imgbtnright").prop("disabled", true)
                    }
                    flag = true
                })

            }
        }
    })
    //数量加减
    let $numpre = $("#numpre")
    let $goodsCount = $("#goodsCount")
    let $numadd = $("#numadd")
    let $goodscount = $goodsCount.val()
    let count
    $numpre.on("click", function () {
        if ($goodsCount.val() >= 2) {
            count = --$goodscount;
            $goodsCount.val(function () {
                return count
            });
        } else {
            return false;
        }
    })
    $numadd.on("click", function () {
        if ($goodsCount.val() <= 9) {
            count = ++$goodscount;
            $goodsCount.val(function () {
                return count;
            })
        } else {
            return false;
        }
    })
    let res = /^[0-9]$|^[10]$/
    $goodsCount.change(function () {
        if (res.test($goodsCount.val()) == false) {
            $goodsCount.val(function () {
                return count;
            })
        }
    })
    //放大镜
    const $listbox = $("#listbox")
    const $rightimgbox = $("#rightimgbox")
    $bigimg.on("mousemove", "#bigrdimg", function (e) {
        let imgsrc = $(this).attr("src")
        // console.log(imgsrc)
        let left1 = e.pageX - $bigimg.offset().left - $listbox.width() / 2
        let top1 = e.pageY - $bigimg.offset().top - $listbox.height() / 2
        // console.log(left1, top1)
        if (left1 < 0) {
            left1 = 0
        } else if (left1 + $listbox.width() > 560) {
            left1 = 560 - $listbox.width()
        }
        if (top1 < 0) {
            top1 = 0
        } else if (top1 + $listbox.height() > 560) {
            top1 = 560 - $listbox.height()
        }
        $listbox.css({
            display:'block',
            left: left1,
            top: top1
        })
        $rightimgbox.css({
            backgroundImage: `url(${imgsrc})`,
            backgroundSize: "1120px 1120px",
            backgroundPosition : `-${left1*2}px -${top1*2}px`
        })
        
        $bigimg.on("mouseenter",function () {
            $listbox.css({
                display:'block'
            })
            $rightimgbox.css({
                display:'block'
            })
        })
        $bigimg.on("mouseleave",function () {
            $listbox.css({
                display:'none'
            })
            $rightimgbox.css({
                display:'none'
            })
        })
    })
})