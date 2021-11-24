$(function(){
    let form = layui.form
    form.verify({
        nickname:[
            /^[\s]{1,10}$/,
            '昵称的长度为1-10个字符!'
        ]
    })
})