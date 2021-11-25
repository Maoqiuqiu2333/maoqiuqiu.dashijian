$(function () {
    // 需求1: 定义校验规则;
    let form = layui.form;
    form.verify({
        // 属性是规则名称，值是规则
        nickname: [
            /^[\S]{1,10}$/,
            "用户昵称为1~10位非空白任意字符！"
        ]
    });

    // 需求2: 发送ajax获取用户信息，渲染到页面中;
    // 封装成函数，后面重置的时候还要用！
    let layer = layui.layer;
    initUserInfo();
    // 封装函数
    function initUserInfo() {
        axios({
            method: 'get',
            url: '/my/userinfo'
        }).then(({ data: res }) => {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            form.val('formUserInfo', res.data);
        });
    }

    // 需求3: 表单重置;
    //   1.给form绑定reset事件。 2.给按钮绑定点击事件;
    // $("form").on('reset', function () {
    $("#btnReset").on('click', function (e) {
        // alert(222);
        e.preventDefault();
        // 重新渲染form表单
        initUserInfo();
    });

    // 需求4: 修改用户信息
    $("#formUserInfo").on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault();
        // 发送ajax
        axios({
            method: 'POST',
            url: '/my/userinfo',
            //  获取 a=1&b=2&c=3 这种类型的参数
            data: $(this).serialize()
        }).then(({ data: res }) => {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            // 成功提示
            layer.msg('恭喜您，用户休息修改成功！');
            // 子页面中调用父页面的方法;
            window.parent.getUserInfo();
        });
    })

});