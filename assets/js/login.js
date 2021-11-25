$(function () {
    // 需求1: 点击a连接，显示隐藏切换;
    $("#loginBox a").on('click', function () {
        // 隐藏登陆盒子，显示注册盒子
        $("#loginBox").hide();
        $("#regBox").show();
    });
    $("#regBox a").on('click', function () {
        // 显示登陆盒子，隐藏注册盒子
        $("#loginBox").show();
        $("#regBox").hide();
    });

    // 需求2: 自定义校验规则;
    let form = layui.form;
    // verify()定义校验规则，参数是一个对象！
    form.verify({
        // 属性是规则名称; 值是具体规则，有两种，数组和函数;
        username: [
            /^[a-zA-Z0-9]{1,10}$/,
            "用户名必须是1-10位字母和数字"
        ],
        // 密码的校验规则
        pwd: [
            /^[\S]{6,15}$/,
            "密码长度必须是6-15位的非空字符串"
        ],
        // 确认密码规则
        repwd: function (value) {
            // 获取密码的值，判断如果和密码的值不相同，就报错！
            let pwd = $("#regBox input[name=password]").val();
            if (pwd != value) {
                return '两次密码输入不一致，请重新输入！'
            }
        }
    });

    // 需求3: 注册功能;
    let layer = layui.layer;
    $("#formReg").on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        // 发送ajax
        axios({
            method: 'POST',
            url: '/api/reguser',
            //   后端只支持 a=1&b=2&c=3  application/x-www-form-urlencoded
            data: $(this).serialize()
            //   后端还是么有办法接受 application/json 类型的数据
            // data: {
            //     username: $("#formReg [name=username]").val(),
            //     password: $("#formReg [name=password]").val(),
            // }
        }).then(({ data: res }) => {
            // console.log(res);
            if (res.status != 0) {
                // return alert(res.message);
                return layer.msg(res.message);
            }
            // 成功提示
            // alert('恭喜您，注册用户成功！');
            layer.msg('恭喜您，注册用户成功！');
            // 清空form表单
            $("#formReg")[0].reset();// reset();是DOM对象的
            // 切换到登录区域
            $("#regBox a").click();
        });
    });

    // 需求4: 登录功能;
    $("#formLogin").on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        // 发送ajax
        axios({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize()
        }).then(({ data: res}) => {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 成功后提示
            layer.msg('恭喜您，登录成功！');
            // 跳转页面
            location.href = '/index.html';
            // 保存token
            localStorage.setItem('token', res.token);
        });
    });
});