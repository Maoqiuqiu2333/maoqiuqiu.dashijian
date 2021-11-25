$(function () {
    // 需求1: 定义校验规则;
    let form = layui.form;
    form.verify({
        // 属性规则名称，值是规则;
        pwd: [
            /^[\S]{6,15}$/, 
            '密码的必须是6-15位的非空字符'
        ],
        // 新密码的规则是，不能和原面相同
        newPwd: function (value) {
            // value 代表新密码的值
            // 获取原密码的值
            let v1 = $('[name=oldPwd]').val();
            // 判断，原密码和新密码相同，报错！
            if (value == v1) {
                return '新旧密码不能相同！';
            }
        },
        // 确认新密码的规则，是必须和新密码相同;
        rePwd: function (value) {
            // value 代表确认新密码的值
            // 获取 新密码的值
            let v2 = $('[name=newPwd]').val();
            // 判断错误情况: 新密码和确认新密码不相同就报错
            if (value != v2) {
                return '两次新密码不一致！';
            }
        }
    });

    // 需求2: 修改密码
    $("#formPwd").on('submit', function (e) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/my/updatepwd',
            // 获取参数 a=1&b=2
            data: $(this).serialize()
        }).then(({ data: res }) => {
            // 判断
            if (res.status != 0) {
                return layui.layer.msg(res.message);
            }
            // 成功给提示
            layui.layer.msg('恭喜您，修改密码成功！');
            // 清空表单 - DOM对象的reset();
            $("#formPwd")[0].reset();
            // // 重新登录
            // setTimeout(function () {
            //     window.parent.location.href = '/login.html';
            // }, 1500);
        });
    })
});