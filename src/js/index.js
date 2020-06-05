$("#header-meizu").load("./header.html")
$("#footer-meizu").load("./footer.html")
let $phoneContent = $(".phone")
$("img.lazy").lazyload({
    effect: "fadeIn" //图片显示方式
});
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
$.ajax({
    url: "http://10.31.162.86/dest/php/getIndexPhone.php",
    async:false,
    success: function (data) {
        data = JSON.parse(data)
        let str = ''
        console.log(data)
        $.each(data, function (index, item) {
            // console.log(item)
            // console.log(item.goodsName)
            // console.log(index)
            if (index <= 1) {
                str += ` <div class="phone-header">
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
                str += `<div class="phone-goods"> 
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
        })
        $phoneContent.html(str)
        $("img.lazy").lazyload({
            effect: "fadeIn" //图片显示方式
        });
    }
})