$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var img = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    img.cropper(options);

    // 需求2: 点击按钮，触发input的点击事件，选择图片;
    $("#chooseImageBtn").on('click', function () {
        $("#chooseImageInp").click();
    });

    // 需求3: 选择图片，渲染到指定区域;
    $("#chooseImageInp").on('change', function (e) {
        // console.log(this.value);
        // console.log(this.files[0]);
        // 1.拿到用户选择的文件
        let file = e.target.files[0]
        // 非空校验
        if (file == undefined) {
            return layui.layer.msg('请选择用户头像！');
        }
        // 2.创建虚拟路径
        let newImgURL = URL.createObjectURL(file);
        // console.log(newImgURL);
        // 3.销毁原有图片和预览区域，设置图片路径，重新渲染
        img.cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options)       // 重新初始化裁剪区域
    })

    // 需求4: 点击按钮，实现头像上传;
    $("#uploadBtn").on('click', function () {
        // 获取base64格式的字符串，头像！
        var dataURL = img.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // // 打印查看一下，base64格式的头像;
        // console.log(dataURL);

        // 发送ajax...
        axios({
            method: 'POST',
            url: '/my/update/avatar',
            //  后端只接受 a=1&b=2&c=3 类型的数据
            //   base64格式头像信息，需要编码，属性和等号不用编码
            data: 'avatar=' + encodeURIComponent(dataURL)
        }).then(({ data: res }) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 成功提示
            layui.layer.msg('恭喜您，修改头像成功！');
            // 刷新index.html页面。
            window.parent.getUserInfo();
        });
    })
});