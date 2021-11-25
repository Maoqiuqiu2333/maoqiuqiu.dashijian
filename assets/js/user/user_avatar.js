$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var img = $('#image')
    // 1.2 配置选项
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    img.cropper(options);

    $("#chooseImageBtn").on('click', function () {
        $("#chooseImageInp").click();
    });

    // 需求3: 选择图片，渲染到指定区域;
    $("#chooseImageInp").on('change', function (e) {
        let file = e.target.files[0]
        // 非空校验
        if (file == undefined) {
            return layui.layer.msg('请选择用户头像！');
        }
        // 2.创建虚拟路径
        let newImgURL = URL.createObjectURL(file);
        img.cropper('destroy')      
            .attr('src', newImgURL) 
            .cropper(options)       
    })

    // 需求4: 点击按钮，实现头像上传;
    $("#uploadBtn").on('click', function () {
        var dataURL = img.cropper('getCroppedCanvas', { 
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       
        axios({
            method: 'POST',
            url: '/my/update/avatar',
            data: 'avatar=' + encodeURIComponent(dataURL)
        }).then(({ data: res }) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            
            layui.layer.msg('恭喜您，修改头像成功！');
            
            window.parent.getUserInfo();
        });
    })
});