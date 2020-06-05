$(function () {
    const $username = $("#username")
    const $password = $("#password")
    const $loginbtn = $("#btn-box")
    const $checkbox = $("#rembPsd")
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
        $.post("http://10.31.162.86/dest/php/login.php", {
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
    })
})