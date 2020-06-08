$(function () {
    $("#header-meizu").load("./header.html", function () {
        hover()
    })
    $("#footer-meizu").load("./footer.html")
    let Id = location.search
    Id = Id.split("=")[1]
    console.log(Id)
    let $navBox = $("#fastnav-abox")
    let $rowleft = $("#row-left")
    let $rowright = $("#row-right")
    let $title = $("title")
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
            data = JSON.parse(data)
            // console.log(data)
            let colorarr = data.goodsColor.split(",")
            console.log(colorarr)
            let colorstr=``
            $.each(colorarr,function(index,item){
                if(item!=''&&index==0){
                    colorstr+= `<a href="#" class="active">${item}</a>`
                }
                else if(item!=''&&index>0) {
                    colorstr+= `<a href="#">${item}</a>`
                }
            })
            console.log(colorstr)
            let memoryarr = data.goodsMemory.split(",")
            let memorystr=``
            $.each(memoryarr,function(index,item){
                if(item!=''&&index==0){
                    memorystr+=`<a href="#" class="active">${item}</a>`
                }
                else if(item!='') {
                    memorystr+=`<a href="#">${item}</a>`
                }
            })
            let packagearr = data.goodsPackage.split(",")
            let packagestr=``
            $.each(packagearr,function(index,item){
                if(item!=''&&index==0){
                    packagestr+=`<a href="#" class="active">${item}</a>`
                }
                else if(item!='') {
                    packagestr+=`<a href="#">${item}</a>`
                }
            })
            let nav = `
            <div id="fastnav-box">
                <span>${data.goodsName}</span>
                <ul>
                    <li><a href="#">概述</a></li>
                    <li><a href="#" class="clear_b">参数</a></li>
                </ul>
            </div>
            `
            let leftbox = `
            <div id="bigimg">
            <a href="javascpit:;">
                <img src=${data.goodsImg} alt="">
            </a>
        </div>
        <ul id="buttom-img-box" class="clear_fix">
            <li>
                <a href="javascript:;">
                    <img src=${data.goodsImg} alt="">
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <img src=${data.goodsminImg2} alt="">
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <img src=${data.goodsminImg3} alt="">
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <img src=${data.goodsminImg4} alt="">
                </a>
            </li>
        </ul>`
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
                <dd class="clear_fix">
                    <a href="#" class="active">全网通公开版</a>
                </dd>
            </dl>
            <dl class="clear_fix">
                <dt>颜色分类</dt>
                <dd class="clear_fix">
                ${colorstr}
                </dd>
            </dl>
            <dl class="clear_fix">
                <dt>内存容量</dt>
                <dd class="clear_fix">
                ${memorystr}
                </dd>
            </dl>
            <dl class="clear_fix">
                <dt>选择套餐</dt>
                <dd class="clear_fix">
                ${packagestr}
                </dd>
            </dl>
        </div>
            `
        $navBox.html(nav)
        $rowleft.html(leftbox)
        $rowright.prepend(rightbox)
        $title.html(`${data.goodsName}-魅族商城`)
        // $(function(){
        //     $("#buttom-img-box")
        // })
        }
    })
})