$("#header-meizu").load("./header.html")
$("#footer-meizu").load("./footer.html")
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