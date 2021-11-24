//入口函数
$(function () {
    //需求1: 渲染用户信息
    // getUserInfo()
    initUserInfo()

    $('#logout').on('click',function(){
        //layui里面的询问框,点击确定才会执行回调函数里面的代码
        layer.confirm('确认退出登陆吗',{icon:3,title:'提示'},function(index){
            //do somethimg
            //销毁token,跳转到登陆页
            localStorage.removeItem('token')
            location.href = '/login.html'
            //自带代码,关闭询问框
            layer.close(index)
        })
    })
})


//获取用户信息渲染头像封装成函数
//需求:必须设置为全局函数,不是局部函数
let layer = layui.layer
// function getUserInfo() {
function initUserInfo() {
    //发送ajax请求
    axios({
        //请求方式是GET,可以省略
        // method:'GET',
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // }
    }).then(({
        data: res
    }) => {
        // console.log(res.message);
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        //渲染
        renderAvatar(res.message)
    })
}

//渲染用户信息和头像
function renderAvatar(user) {
    // 渲染欢迎 - 如果nickname优先渲染nickname,没有nickname渲染username
    // || 链接两个值,如果第一个值是false类型,返回第二个值,无论第二个值是什么
    // && 链接两个值,如果第一个是false类型,直接返回
    let name = user.nickname || user.username
    $(".welcome").html("欢迎&nbsp;" + name)
    if (user.user_pic !== null) {
        // 如果有图片头像渲染图片头像 -隐藏文字头像,显示图片头像
        $(".avatar-text").hide()
        $(".layui-nav-img").show().attr("src", user.user_pic)
    } else {
        // 如果没有图片头像,就渲染文字头像 -隐藏图片头像,显示文字头像
        $(".layui-nav-img").hide()
        //渲染name中的第一个单词字符,而且大写
        let first = name[0].toUpperCase()
        $(".avatar-text").show().html(first)
    }
}