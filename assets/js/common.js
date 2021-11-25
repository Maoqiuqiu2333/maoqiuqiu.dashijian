// 全局配置基础路径
axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net';
// 他的缺点是设置所有请求
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 设置请求拦截器，配置token认证
axios.interceptors.request.use(function (config) {
    // 添加逻辑 - 配置token认证
    // 判断：只有路径是 /my 开头的才配置 token
    // if (config.url.indexOf('/my') > -1) {
    // if (config.url.indexOf('/my') >= 0) {
    if (config.url.indexOf('/my') != -1) {
        config.headers.Authorization = localStorage.getItem('token'); 
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 设置响应拦截器 - 没有登录或者token失效，都要前置跳转到登录页！
axios.interceptors.response.use(function (response) {
    // 添加逻辑 - 判断响应信息，如果是: '身份认证失败！' 就强制跳转到登录页
    // if (response.data.status == 1 && response.data.message === '身份认证失败！') {
    if (response.data.message === '身份认证失败！') {
        // 跳转到登录页
        location.href = '/login.html';
        // 销毁无效的token
        localStorage.removeItem('token');
    }
    // 返回信息一定要写到if语句的外面
    return response;
}, function (error) {
    return Promise.reject(error);
});
