$(function () {
    const $username = $("#username")
    const $password = $("#password")
    const $loginbtn = $("#btn-box")
    const $checkbox = $("#rembPsd")
    const $msgbox = $("#msgbox")
    const $yzm = $("#yzm")
    if (getCookie("username")) {
        $username.val(getCookie("username"))
    }
    if (getCookie("password")) {
        $password.val(getCookie("password"))
    }
    if (getCookie("username") && getCookie("password")) {
        $checkbox.prop("checked", true)
        $.post("http://10.31.162.86/dest/php/login.php", {
                "username": $username.val(),
                "userpass": $password.val()
            },
            function (data) {
                if (data == 1) {
                    location.href = './index.html'
                } else if (data == 0) {
                    addCookie("username", $username.val(), -1)
                    addCookie("password", $password.val(), -1)
                    location.reload();
                }

            })
    }
    $loginbtn.on("click", function () {
        if ($username.val() != '' && $password.val() != '' && $yzm.val() != "") {
            $.ajax({
                type: "GET",
                url: "http://10.31.162.86/php/yzm.php",
                data: {
                    "code": $yzm.val()
                },
                success: function (data) {
                    if (data == 0) {
                        alert("验证码错误")
                    } else if (data == 1) {
                        $.post("http://10.31.162.86/php/login.php", {
                                "username": $username.val(),
                                "userpass": $password.val()
                            },
                            function (data) {
                                if (data == 1) {
                                    if ($checkbox.prop("checked") == true) {
                                        addCookie("username", $username.val(), 999)
                                        addCookie("password", $password.val(), 999)
                                    }
                                    if ($checkbox.prop("checked") == false) {
                                        addCookie("username", $username.val(), 999)
                                        addCookie("password", $password.val(), -1)
                                    }
                                    alert("登入成功")
                                    location.href = './index.html'
                                } else if (data == 0) {
                                    alert("用户名或密码错误")
                                }

                            })
                    }
                }
            })
        } else if ($username.val() == '' || $password.val() == '') {
            $msgbox.html("用户名或密码不能为空").stop(true).fadeIn(600).delay(1200).fadeOut(600)
        }
    })
})