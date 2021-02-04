// /api/user/
const querystring = require('querystring');
const {
    login
} = require('../controller/user');

const handleUserServer  = (req,res) => {
    const routerAllUrl = req.url;
    const routeUrl = routerAllUrl.split('?')[0];
    console.log(routeUrl);

    // post 请求部分
    let post = '';
    // 监听请求
    req.on('data', function (chunk) {
        post += chunk;
    });
    // 接受参数
    req.on('end', function () {
        const postData = querystring.parse(post);
        // 登录
        if (routeUrl === '/api/user/login') {
            res.end(JSON.stringify(login({
                username:postData.username, 
                password:postData.password
            })));
        };
    });
}

module.exports = handleUserServer