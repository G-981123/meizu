$("#header-meizu").load("./header.html")
$("#footer-meizu").load("./footer.html")
let $phoneContent = $(".phone")
let $acousticContent = $(".acoustic")
let $accessoriesContent = $(".accessories")
let $community = $("#community")
let $video = $("#video")
// $("img.lazy").lazyload({
//     effect: "fadeIn" //图片显示方式
// });

//轮播图逻辑
$(function () {
    let showbox = $("#banner-show")
    let imgbox = $("#bannerbox")
    let btns = $("#bannerbtns li")
    let banner = new Banner({
        showBox: showbox,
        imgBox: imgbox,
        btns: btns,
        time: 2000
    })
    banner.init();
})
// $.get(
//     "http://10.31.162.86/dest/php/getIndexPhone.php",
//     function (data) {
//         data = JSON.parse(data)
//         let str = ''
//         // console.log(data)
//         $.each(data, function (index, item) {
//             // console.log(item)
//             // console.log(item.goodsName)
//             console.log(index)
//             if (index <= 1) {
//                 str += ` <div class="phone-header">
//                                 <a href="#" class="box-a">
//                                 <span class="goods-name-top">${item.goodsName}</span>
//                                 <p class="goods-desc-top">${item.goodsDesc}</p>
//                                 <span class="goods-price-top"><i>￥</i>${item.goodsPrice}</span>
//                                 <div class="goods-img-box-top">
//                                     <img class="lazy" data-original=${item.goodsImg}
//                                         alt="">
//                                 </div>
//                             </a>
//                         </div>`
//             }
//             else{
//                 str += `<div class="phone-goods"> 
//                 <a href="#" class="box-a">
//                     <div class="goods-img-box">
//                         <img class="lazy" data-original=${item.goodsImg} alt="">
//                     </div>
//                     <span class="goods-name">${item.goodsName}</span>
//                     <p class="goods-desc">${item.goodsDesc}</p>
//                     <span class="goods-price"><i>￥</i>${item.goodsPrice}</span>
//                 </a>
//             </div>`
//             }
//         })
//         $phoneContent.html(str);
//         $("img.lazy").lazyload({
//             effect: "fadeIn" //图片显示方式
//         });
//     }
// )
//获取手机 声学 配件 板块 逻辑
function phone (){
    $.ajax({
        type:"GET",
        url: "http://10.31.162.86/dest/php/getIndexPhone.php",
        async: false,
        success: function (data) {
            data = JSON.parse(data)
            let phonestr = ""
            let acousticstr ="" 
            let accessoriesstr = ""
            let phonearr = []
            let acousticarr = []
            let accessoriesarr = []
            // console.log(data)
    
            $.each(data, function (index, item) {
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
            $phoneContent.html(phonestr)
            $acousticContent.html(acousticstr)
            $accessoriesContent.html(accessoriesstr)
            $("img.lazy").lazyload({
                effect: "fadeIn" //图片显示方式
            });
            // console.log(phonearr)
            // console.log(acousticarr)
            // console.log(accessoriesarr)
        }
    })
}
//获取社区 视频 板块 逻辑 
function video(){
    $.ajax({
        type:"GET",
        url: "http://10.31.162.86/dest/php/getIndexCommunity.php",
        success:function (res) {
            res = JSON.parse(res)
            let videostr = ""
            let communitystr = ""
            // console.log(res[0].data)
            // console.log(res[1].str)
            $.each(res[0].data, function (index, item) {
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
            $video.html(videostr)
            $.each(res[1].str, function (index, item) {
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
            $community.html(communitystr)
        }
    })
}
async function render (){
    await video()
    await phone()
}
render()