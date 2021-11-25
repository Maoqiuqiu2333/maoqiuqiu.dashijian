// 入口函数
$(function () {
    // 需求1: 渲染用户信息;
    getUserInfo();

    // 需求2: 退出登录
    $("#logout").on('click', function () {
        // 弹出询问框
        layer.confirm('确认退出登录吗？', { icon: 3, title: '提示' }, function (index) {
            // do something
            // 页面跳转到登录页
            location.href = '/login.html';
            // 销毁token
            localStorage.removeItem('token');
            // 关闭对话框
            layer.close(index);
        });
    });
});

// 封装一个方法，渲染用户信息；
//   注意：把方法设置为全局函数，方便后面使用！
let layer = layui.layer;
function getUserInfo() {
    axios({
        method: 'GET',
        url: '/my/userinfo',
        // // 所有 /my 开头的路径，需要设置 token
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // }
    }).then(({ data: res }) => {
        // console.log(res);
        if (res.status != 0) {
            return layer.msg('获取用户基本信息失败！');
        }
        // 渲染用户头像
        renderAvatar(res.data);
    })
}

// 封装一个方法： 渲染用户头像
function renderAvatar(user) {
    // 渲染欢迎词 - 优先渲染用户昵称，没有昵称才渲染用户名
    let name = user.nickname || user.username;
    $(".welcome").html("欢迎 " + name);
    // 渲染头像: 判断图片头像是否存在;
    if (user.user_pic != null) {
        // 有图片头像，就渲染图片头像，隐藏文字头像;
        $(".text-avatar").hide();
        $(".layui-nav-img").show().attr('src', user.user_pic);
    } else {
        // 没有图片头像，就渲染文字头像，隐藏图片头像;
        $(".layui-nav-img").hide();
        // 文字头像，要把name的首字母大写后赋值！
        let first = name[0].toUpperCase();
        $(".text-avatar").show().html(first);
    }
}
