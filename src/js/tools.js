// 轮播图的半封装
/* <div class="lunbo">
<ul>
    <!-- 切换的图片 -->
    <li><img src="../img/pic0.jpg" alt=""></li>
    <li><img src="../img/pic1.jpg" alt=""></li>
    <li><img src="../img/pic2.jpg" alt=""></li>
    <li><img src="../img/pic3.jpg" alt=""></li>
    <li><img src="../img/pic4.jpg" alt=""></li>
</ul>
<ol>
    <!-- 切换的小圆圈按钮 -->
    <li class="active">1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
</ol>
</div> */


class Banner {
    //显示的DOM  装图片的DOM 小圆圈按钮 左按钮 右按钮
    constructor(obj) {
        this.$showBox = obj.showBox, //显示的盒子
            this.$imgBox = obj.imgBox, //装图片的盒子
            this.$imgs = this.$imgBox.children(), //所有的图片li
            this.$btns = obj.btns, //所有的小圆圈
            this.index = 0,
            this.mytimer = null,
            this.time = obj.time //轮播一张图片的时间
    }
    init() {
        let _this = this;
        const $cloneimg = _this.$imgs.first().clone(true, true)
        let $liwidth = _this.$imgs.first().width()
        _this.$imgBox.append($cloneimg).css({
            width: $liwidth * _this.$imgBox.children().length
        })
        this.$btns.on('click', function () {
            _this.$btns.removeClass('active')
            $(_this).addClass('active')
        })
        //移入移出隐藏箭头
        this.$showBox.hover(function () {
            clearInterval(_this.mytimer)
        }, function () {
            _this.mytimer = setInterval(function () {
                _this.imggo($liwidth)
            }, _this.time)
        })
        //点击小圆圈切换图片
        this.$btns.on('click', function () {
            // console.log($(this).index())
            _this.index = $(this).index() - 1
            _this.imggo($liwidth)
        })
        //点击箭头切换图片
        this.mytimer = setInterval(function () {
            _this.imggo($liwidth)
        }, _this.time)
    }
    imggo($liwidth) {
        this.index++
        if (this.index === this.$imgBox.children().length) {
            this.$imgBox.css({
                left: 0
            })
            this.index = 1
        }
        if (this.index === -1) {
            this.$imgBox.css({
                left: -this.$btns.length * $liwidth
            })
            this.index = this.$btns.length - 1
        }
        //小圆圈处理
        if (this.index === this.$btns.length) {
            this.$btns.removeClass('active')
            this.$btns.eq(0).addClass('active')
        } else {
            this.$btns.removeClass('active')
            this.$btns.eq(this.index).addClass('active')
        }
        this.$imgBox.stop(true).animate({
            left: -$liwidth * this.index
        })
    }
}

function addCookie(key, value, count) {
    // 1、失效时间点
    let d = new Date();
    d.setDate(d.getDate() + count);
    document.cookie = `${key}=${escape(value)};expires=${d.toGMTString()}`;
}

function getCookie(key) {

    let str = unescape(document.cookie); //获取当前网站所有的cookie（键值对）：ausername=肖阳aaa; username=肖阳; userpass=123

    // 1、用字符串的split函数，分割cookie字符串，分割成了数组
    let arr = str.split("; ");

    // 2、循环数组，查询key对应的元素（以 key = 开头的元素）
    for (let i = 0; i < arr.length; i++) {

        if (arr[i].indexOf(key + "=") == 0) {
            return arr[i].split("=")[1];
        }
    }
    return null;
}

function removeCookie(key) {
    addCookie(key, "byebye", -1);
}

function updateCookie(key, value, count) {
    addCookie(key, value, count);
}



