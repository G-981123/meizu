function hover() {
    let headershow = $("#header-show")
    let showcontent = $("#show-content")
    let items = $(".item")
    let olis = $("#nav>li")
    let oas = olis.children()
    let loge = $('.icon-meizu')
    let yonghu = $('.icon-yonghu')
    let gouwuche = $('.icon-gouwuchekong')
    olis.hover(function () {
        headershow.stop(true).slideDown(100)
        showcontent.stop(true).slideDown(400)
        items.eq($(this).index()).show().siblings().hide()
        loge.addClass('icon-meizu-color')
        yonghu.addClass('icon-yonghu-color')
        gouwuche.addClass('icon-gouwuchekong-color')
        oas.eq($(this).index()).parent().siblings().children().addClass('showdowncolor')
    }, function () {
        showcontent.stop(true).slideUp(100)
        headershow.stop(true).slideUp(200)
        loge.removeClass('icon-meizu-color')
        yonghu.removeClass('icon-yonghu-color')
        gouwuche.removeClass('icon-gouwuchekong-color')
        oas.eq($(this).index()).parent().siblings().children().removeClass('showdowncolor')
    })
    showcontent.mouseenter(function () {
        showcontent.stop(true).slideDown()
        headershow.stop(true).slideDown()
        loge.addClass('icon-meizu-color')
        yonghu.addClass('icon-yonghu-color')
        gouwuche.addClass('icon-gouwuchekong-color')
        oas.addClass('showdowncolor')
    })
    showcontent.mouseleave(function () {
        showcontent.stop(true).slideUp(100)
        headershow.stop(true).slideUp(200)
        loge.removeClass('icon-meizu-color')
        yonghu.removeClass('icon-yonghu-color')
        gouwuche.removeClass('icon-gouwuchekong-color')
        oas.removeClass('showdowncolor')
    })
}
function cartclick (){
    let $cart =$("#cart")
    $cart.on("click",function(){
        window.open("./cart.html")
    })
    let $user =$("#user")
    $user.on("click",function(){
        window.open("./login.html")
    })
}
