//全局配置基础路径
axios.defaults.baseURL= "http://api-breakingnews-web.itheima.net"

//设置请求拦截器,配置token认证
axios.interceptors.request.use(config => {
// 添加逻辑 - 配置token认证
//判断: 只有路径是 /my 开头的才配置 token
if (config.url.indexOf('/my')!=-1) {
    config.headers.Authorization = localStorage.getItem("token")
}
//修改完毕的config需要返回
return config;
},error => {
// 将来讲解 Promise 对象,详细讲解
return Promise.reject(error);
});

// 设置响应拦截器 - 没有登录或者token失效,都要前置跳转到登录页
axios.interceptors.response.use(response => {
// 添加逻辑 - 判断响应信息,如果是:'身份认知失败' 就强制跳转到登录页
// if (response.data.status ==1 &&response.data.message === '身份认证失败!') {
    if (response.data.message === '身份认证失败！') {
    location.href = '/login.html'
    // 销毁无效的token
    localStorage.removeItem("token")

}
return response;
},error => {
return Promise.reject(error);
});
