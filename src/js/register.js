class Validation {
    constructor(obj) {
        this.dom = obj.dom,
            this.matching = obj.matching,
        // this.yznum = 0
        this.msgdom =obj.msgdom,
        this.str=obj.str
    }
    contrast() {
        let reg = this.matching
        let _this = this
        // return new Promise( async(resolve,rejcct)=>{
        // await
        this.dom.focusout(() => {
            let regvalue = _this.dom.val()
            // console.log(_this.dom.val())
            // console.log(reg)
            if (reg.test(regvalue)) {
                _this.dom.next().html("√").css({color:'green'}).attr("data-num", 1)
                // console.log(1)
                // resolve(_this.yznum=1)
            } else {
                _this.dom.next().html("×").css({color:'red'}).attr("data-num", 0)
                // console.log(2)
                // resolve(_this.yznum=0)
                _this.msgdom.html(_this.str).stop(true).fadeIn(600).delay(1200).fadeOut(600)
            }
        })
        // })
    }
}
let $username = $("#username")
let $password = $("#password")
let $passwordr = $("#passwordr")
let $btn = $("#btn-box")
let $msgbox=$("#msgbox")
let user =false // 解决用户名后端验证延时问题提前注册问题
// username.focusout(function(){
//     console.log(1)
// })
let isuser = new Validation({
    dom: $username,
    matching: /^[a-zA-Z]\w{5,15}$/,
    msgdom:$msgbox,
    str:'用户名格式错误'
})
isuser.contrast()

let ispass = new Validation({
    dom: $password,
    matching: /^\w{6,16}$/,
    msgdom:$msgbox,
    str:'密码格式错误'
})
ispass.contrast()
// let ispassr=new Validation({
//     dom:$passwordr,
//     matching:/^\w{6,16}$/
// })
// ispassr.contrast()

//判断两个密码一样
function isUser() {
    if ($username.val() != '') {
        $.get(
            "http://10.31.162.86/dest/php/registeruser.php", {
                "username": $username.val()
            },
            function (data) {
                if (data == 1) {
                    $username.next().html("×").css({color:'red'}).attr("data-num", 0)
                    $msgbox.html("用户名已存在").stop(true).fadeIn(600).delay(1200).fadeOut(600)
                    // console.log(1)
                } else if (data == 0) {
                    $username.next().html("√").css({color:'green'}).attr("data-num", 1)
                    // console.log(2)
                    user =true
                }
            }
        )
    } else {
        return false
    }
}
$username.focusout(function () {
    user=false
    if($(this).next().html()=="√"){
        isUser()
    }
})
$passwordr.focusout(function () {
    if ($(this).val() != '' && $(this).val() == $password.val()) {
        $(this).next().html("√").css({color:'green'}).attr("data-num", 1)
    } else {
        $(this).next().html("×").css({color:'red'}).attr("data-num", 0)
        $msgbox.html("两次密码不一致").stop(true).fadeIn(600).delay(1200).fadeOut(600)
    }
})
$password.focusout(function () {
    if ($passwordr.val() != '') {
        if ($passwordr.val() != '' && $passwordr.val() == $password.val()) {
            $passwordr.next().html("√").css({color:'green'}).attr("data-num", 1)
        } else {
            $passwordr.next().html("×").css({color:'red'}).attr("data-num", 0)
            $msgbox.html("密码格式错误").stop(true).fadeIn(600).delay(1200).fadeOut(600)
        }
    } else {
        return
    }
})
$btn.on("click",function () {
    let yzarr = [0, 0, 0]
    $(".right-msg").each(function (index, item) {
        //  yzarr[index] = item.attr("data-num");
        //  console.log(yzarr[index])
        // console.log(index)
        yzarr[index] = $(this).attr('data-num')
    })
    //  console.log(parseInt(yzarr[0])+parseInt(yzarr[1])+parseInt(yzarr[2]))
    if (parseInt(yzarr[0]) + parseInt(yzarr[1]) + parseInt(yzarr[2]) == 3&&user==true) {
        $.post("http://10.31.162.86/dest/php/register.php", {
                "username": $username.val(),
                "userpass": $password.val()
            },
            function (data) {
                if (data == 1) {
                    alert("注册成功")
                    addCookie("username",$username.val(),1)
                    location.href='./login.html'
                } else if (data == 0) {
                    alert("注册失败")
                }

            })
    } else {
        $msgbox.html("输入错误,请重新输入").stop(true).fadeIn(600).delay(1200).fadeOut(600)
    }
    if($passwordr.val() == ''||$password.val() == ''||$username.val() == ''){
        $msgbox.html("用户名或密码不能为空").stop(true).fadeIn(600).delay(1200).fadeOut(600)
    }
})