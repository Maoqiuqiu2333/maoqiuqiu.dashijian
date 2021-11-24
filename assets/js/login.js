$(function () {
    //需求1: 点击a链接,显示隐藏切换
    $("#loginBox a").on("click", function () {
        //点击登录框内部的a链接
        //隐藏登录盒子,显示注册盒子
        $("#loginBox").hide()
        $("#regBox").show()
    })
    $("#regBox a").on("click", function () {
        //点击注册框内部的a链接
        //隐藏注册盒子,显示登录盒子
        $("#loginBox").show()
        $("#regBox").hide()
    })

    //需求2: 自定义校验规则
    let form = layui.form
    // verify()定义校验规则,参数是一个对象
    form.verify({
        // 属性是规则名称,值是具体规则,有两种,数组和函数
        username: [
            /^[a-zA-Z0-9]{1,10}$/,
            "用户名必须是1-10位字母和数字"
        ],
        //密码的校验规则
        pwd: [
            /^[\S]{6,15}$/,
            "密码长度必须是6到15位"
        ],
        //确认密码规则
        repwd: function (value) {
            // 获取密码的值,判断如果和密码的值不同,就报错!
            let pwd = $("#regBox input[name=password]").val()
            if (pwd != value) {
                return "两次密码输入不一致,请重新输入!"
            }
        }
    })


    //需求3: 注册功能;
    let layer = layui.layer
    $("#formReg").on("submit", function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //发送axios
        axios({
            method: 'POST',
            url: '/api/reguser',
            //不要传递对象类型,因为对象类型头信息设置的是application/json
            //content-type: application/json; 目前接口文档不支持
            data: $(this).serialize()
        }).then(({ data: res }) => {
            // console.log(res.data);
            if (res.status != 0) {
                // return alert("res.message")
                return layer.msg(res.message)
            }
            // 成功提示
            // alert("注册成功")
            layer.msg("注册成功")
            // 切换到登录模块
            $("#regBox a").click()
            // 清空表单 - DOM元素中,有一个 reset() 可以重置表单
            $("#formReg")[0].reset()
        })
    })

    //需求4: 登录功能
    $("#formLogin").on("submit",function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //发送ajax
        axios({
            method:'POST',
            url: '/api/login',
            data: $(this).serialize()
        }).then(({ data: res }) => {
            // console.log(res.data);
            if (res.status != 0) {
                // return alert("res.message")
                return layer.msg(res.message)
            }
            // 成功提示
            // alert("注册成功")
            layer.msg("登录成功")
            // 保存token
            localStorage.setItem("token",res.token)
            // 跳转页面
            location.href = '/index.html'
        })
    })



})