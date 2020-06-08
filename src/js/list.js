$(function () {
    $("#header-meizu").load("./header.html", function () {
        hover()
    })
    $("#footer-meizu").load("./footer.html")
    let moren =$("#moren")
    let priceup=$("#price-up")
    let pricedown=$("#price-down")
    let array_default = [];//排序前的li数组
    let array = [];//排序中的数组
    let prev = null;
    let next = null;
    let obtns =$(".btns")
    const $listbox = $('#phone-content');
    $.ajax({
        type:"GET",
        url:"http://10.31.162.86/dest/php/list.php",
        success:function(data){
            let str=``
            data= JSON.parse(data)
            $.each(data,function(index,item){
                str+=`
                <div class="phone-goods" data-goodsid=${item.goodsId}>
                    <a href="javascript:;" class="box-a">
                        <div class="goods-img-box">
                        <img class="lazy" data-original=${item.goodsImg} alt="">
                        </div>
                        <span class="goods-name">${item.goodsName}</span>
                        <p class="goods-desc">${item.goodsDesc}</p>
                        <span class="goods-price"><i>￥</i>${item.goodsPrice}</span>
                    </a>
                </div>
                `
            })
             $listbox.html(str)
             $(function () {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });
            // console.log($listbox.children())
            array_default = [];//排序前的li数组
            array = [];//排序中的数组
            prev = null;
            next = null;
            //将页面的li元素加载到两个数组中
            $listbox.children().each(function (index, element) {
                array[index] = $(this);
                array_default[index] = $(this);
            });
        }
    })
    $('.page').pagination({
        pageCount: 8,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                type:"GET",
                url:"http://10.31.162.86/dest/php/list.php",
                data:{
                    page: api.getCurrent()
                },
                success:function(data){
                    let str=``
                    data= JSON.parse(data)
                    $.each(data,function(index,item){
                        str+=`
                        <div class="phone-goods" data-goodsid=${item.goodsId}>
                            <a href="#" class="box-a">
                                <div class="goods-img-box">
                                <img class="lazy" data-original=${item.goodsImg} alt="">
                                </div>
                                <span class="goods-name">${item.goodsName}</span>
                                <p class="goods-desc">${item.goodsDesc}</p>
                                <span class="goods-price"><i>￥</i>${item.goodsPrice}</span>
                            </a>
                        </div>
                        `
                    })
                     $listbox.html(str)
                     $(function () {
                        $("img.lazy").lazyload({ effect: "fadeIn" });
                    });
            
                    array_default = [];//排序前的li数组
                    array = [];//排序中的数组
                    prev = null;
                    next = null;
                    //将页面的li元素加载到两个数组中
                   $(".phone-goods").each(function (index, item) {
                        array[index] = $(this)
                        array_default[index] = $(this)
                    })
                }
            })
        }
    })
    
    moren.on('click', function () {
        obtns.removeClass("active")
        $(this).addClass("active")
        $.each(array_default, function (index, item) {
            console.log(item)
            $listbox.append(item);
        });
        // console.log(parseFloat(array[1].find('.goods-price').html().substring(9)))
        console.log(array[1].find('.goods-price').text().substring(1))
        return;
    });
    priceup.on('click', function () {
        obtns.removeClass("active")
        $(this).addClass("active")
        console.log(2)
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.goods-price').text().substring(1));
                next = parseFloat(array[j + 1].find('.goods-price').text().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        //这里能够省略empty
        //append在追加的时候，如果追加的是jquery的元素对象，而jquery元素对象在你追加的元素中存在，直接取出存在的元素，从后面追加。
        //如果追加的是内容结构，依然和appendChild一样，后面继续追加。
        $.each(array, function (index, item) {
            $listbox.append(item);
        });
    });
    pricedown.on('click', function () {
        obtns.removeClass("active")
        $(this).addClass("active")
        console.log(3)
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.goods-price').text().substring(1));
                console.log(prev)
                next = parseFloat(array[j + 1].find('.goods-price').text().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $listbox.empty();//清空原来的列表
        $.each(array, function (index, item) {
            $listbox.append(item);
        });
    })
    $listbox.on("click",".box-a",function(){
        let Id =$(this).parent().attr("data-goodsid")
        window.open("http://10.31.162.86/dest/details.html?Id="+Id)
    })
})