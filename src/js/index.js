// $("img.lazy").lazyload({
//     effect: "fadeIn" //图片显示方式
// });
$(function () {
    $("#header-meizu").load("./header.html", function () {
        hover()
        cartclick()
    })
    $("#footer-meizu").load("./footer.html")
    let showbox = $("#banner-show")
    let imgbox = $("#bannerbox")
    let btns = $("#bannerbtns li")
    //轮播图逻辑
    let banner = new Banner({
        showBox: showbox,
        imgBox: imgbox,
        btns: btns,
        time: 2000
    })
    banner.init();
    phone();
    scroll()
    let $louti = $("#louti-box>li")
    let $loutibox = $("#louti")
    let $louceng = $(".phone-content")
    let $last = $("#last")
    // let $alouceng = $(".phone-content")
    // let $alouti = $("#louti-box>li")
    // let $aloutibox =$("#louti")
    // let $alast=$("#last")
    // console.log($alouceng)
    // let louti =new Louti({
    //     $louceng:$alouceng,
    //     $louti:$alouti,
    //     $loutibox:$aloutibox,
    //     $last:$alast
    // })
    // louti.init()
    function scroll() {
        $(window).scroll(function () {
            // console.log($(window).scrollTop())
            let $top = parseFloat($(window).scrollTop())
            $top >= 800 ? $loutibox.show(500) : $loutibox.hide(500)
            $.each($louceng, function (index, item) {
                let $loucengtop = parseFloat($(item).offset().top) + parseFloat($(item).height() / 2)
                // console.log(index)
                // console.log($(item))
                // console.log($top)
                // console.log($loucengtop)
                if ($loucengtop > $top) {
                    $louti.removeClass("loutiactive")
                    $louti.eq(index).addClass("loutiactive")
                    return false
                }
            })
        })
    }
    $louti.not($last).on("click", function () {
        $(window).off('scroll');
        $louti.removeClass('loutiactive')
        $(this).addClass('loutiactive')
        let $loucengtop = $louceng.eq($(this).index()).offset().top
        $('html,body').animate({
            scrollTop: $loucengtop
        }, function () {
            $(window).on('scroll', function () {
                scroll()
            })
        })
    })
    $last.on("click", function () {
        $(window).off('scroll');
        $('html,body').animate({
            scrollTop: 0
        },function(){
            scroll()
        })
    })
})
//获取手机 声学 配件 板块 逻辑
function phone() {
    let $phoneContent = $(".phone")
    let $acousticContent = $(".acoustic")
    let $accessoriesContent = $(".accessories")
    let $community = $(".community")
    let $video = $(".video")
    $.ajax({
        type: "GET",
        url: "http://10.31.162.86/php/getIndexPhone.php",
        async: false,
        success: function (res) {
            res = JSON.parse(res)
            let phonestr = "" //手机html
            let acousticstr = "" //声学
            let accessoriesstr = "" //配件
            let videostr = "" //视频
            let communitystr = "" //社区
            let phonearr = []
            let acousticarr = []
            let accessoriesarr = []
            let videoarr = []
            let communityarr = []
            // console.log(res)

            $.each(res[0].phone, function (index, item) {
                if (item.goodsType == "001") {
                    phonearr.push(item)
                }
                if (item.goodsType == "002") {
                    acousticarr.push(item)
                }
                if (item.goodsType == "003") {
                    accessoriesarr.push(item)
                }
                // console.log(item)
                // console.log(item.goodsName)
                // console.log(index)
            })
            $.each(res[1].data, function (index, item) {
                videoarr.push(item)
            })
            $.each(res[2].str, function (index, item) {
                communityarr.push(item)
            })
            // console.log(videoarr,communityarr)
            $.each(phonearr, function (index, item) {
                if (index <= 1) {
                    phonestr += ` <div class="phone-header">
                                                            <a href="#" class="box-a">
                                                            <span class="goods-name-top">${item.goodsName}</span>
                                                            <p class="goods-desc-top">${item.goodsDesc}</p>
                                                            <span class="goods-price-top"><i>￥</i>${item.goodsPrice}</span>
                                                            <div class="goods-img-box-top">
                                                                <img class="lazy" data-original=${item.goodsImg}
                                                                    alt="">
                                                            </div>
                                                        </a>
                                                    </div>`
                } else {
                    phonestr += `<div class="phone-goods"> 
                                            <a href="#" class="box-a">
                                                <div class="goods-img-box">
                                                    <img class="lazy" data-original=${item.goodsImg} alt="">
                                                </div>
                                                <span class="goods-name">${item.goodsName}</span>
                                                <p class="goods-desc">${item.goodsDesc}</p>
                                                <span class="goods-price"><i>￥</i>${item.goodsPrice}</span>
                                            </a>
                                        </div>`
                }
                if (index >= 5) {
                    return false
                }
            })
            $.each(acousticarr, function (index, item) {
                if (index <= 12) {
                    acousticstr += `<div class="phone-goods"> 
                                            <a href="#" class="box-a">
                                                <div class="goods-img-box">
                                                    <img class="lazy" data-original=${item.goodsImg} alt="">
                                                </div>
                                                <span class="goods-name">${item.goodsName}</span>
                                                <p class="goods-desc">${item.goodsDesc}</p>
                                                <span class="goods-price"><i>￥</i>${item.goodsPrice}</span>
                                            </a>
                                        </div>`
                } else {
                    return false
                }
            })
            $.each(accessoriesarr, function (index, item) {
                if (index <= 12) {
                    accessoriesstr += `<div class="phone-goods"> 
                                            <a href="#" class="box-a">
                                                <div class="goods-img-box">
                                                    <img class="lazy" data-original=${item.goodsImg} alt="">
                                                </div>
                                                <span class="goods-name">${item.goodsName}</span>
                                                <p class="goods-desc">${item.goodsDesc}</p>
                                                <span class="goods-price"><i>￥</i>${item.goodsPrice}</span>
                                            </a>
                                        </div>`
                } else {
                    return false
                }
            })

            //             // console.log(res[0].data)
            //             // console.log(res[1].str)
            $.each(videoarr, function (index, item) {
                videostr += `
                            <div class="video-list">
                            <a href=${item.link}>
                                <div class="video-list-img">
                                    <img src=${item.img}
                                        alt="">
                                    <span class="playbtn"></span>
                                </div>
                                <p class="video-list-desc">${item.describe}</p>
                            </a>
                            </div>
                            `
            })
            $.each(communityarr, function (index, item) {
                communitystr += `
                    <div class="community-list">
                            <a href="javascript:;">
                                <div class="community-list-img"><img
                                        src=${item.bigimg}
                                        alt=""></div>
                                <div class="usermsg">
                                    <span><img
                                            src=${item.userimg}
                                            alt=""></span><em>${item.username}</em>
                                </div>
                                <p class="userdesc">${item.usertext}</p>
                                <span class="userphone">${item.userphone}</span>
                            </a>
                        </div>
                    `
            })
            $phoneContent.html(phonestr)
            $acousticContent.html(acousticstr)
            $accessoriesContent.html(accessoriesstr)
            // console.log(communitystr)
            // console.log(videostr)
            $community.html(communitystr)
            $video.html(videostr)
            // console.log(phonearr)
            // console.log(acousticarr)
            // console.log(accessoriesarr)
            $("img.lazy").lazyload({
                effect: "fadeIn" //图片显示方式
            });
        }
    })
}