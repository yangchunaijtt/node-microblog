// /api/user/
const querystring = require('querystring');
const {
    login
} = require('../controller/user');
const { get, set } = require('../db/redis');

const handleUserServer = (req, res) => {
    const routerAllUrl = req.url;
    const routeUrl = routerAllUrl.split('?')[0];
    const routeMethod = req.method;
    // post 请求部分
    req.body = '';
    // 监听请求
    req.on('data', function (chunk) {
        req.body += chunk.toString();
    });
    // 接受参数
    req.on('end', function () {
        // 登录
        if (routeMethod === 'POST') {
            req.body = JSON.parse(req.body);
            if (routeUrl === '/api/user/login') {
                // 设置token部分
                let token = req.cookie['token'];
                if (!token) {
                    token = `${Date.now()}_${Math.random() * 100000}`;
                };
                set(token, {})
                get(token).then(res => {
                    req.session = res;
                    console.log('redis=====', res)
                });
                login({
                    username: req.body.username,
                    password: req.body.password,
                    token
                }).then(result => {
                    res.end(JSON.stringify(result))
                }).catch(error => {
                    res.end(JSON.stringify(error))
                })
            };
        }

    });
}

module.exports = handleUserServer