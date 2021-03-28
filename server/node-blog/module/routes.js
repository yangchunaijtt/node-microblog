const url = require('url');

const { accessWriteLog } = require('../src/utils/log')

let G = {

};

let app = (req, res) => {
    // 写入日志
    const logStr = `${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`;
    // accessWriteLog(logStr);
    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie;
    if (cookieStr) {
        if (cookieStr.indexOf(';') != -1) {
            cookieStr.split(";").forEach(item => {
                if (!item) {
                    return
                }
                const arr = item.split("=")
                const key = arr[0].trim()
                const value = arr[1]
                req.cookie[key] = value.trim()
            });
        } else {
            const arr = cookieStr.split("=")
            const key = arr[0].trim()
            const value = arr[1]
            req.cookie[key] = value.trim()
        }
    }

    // 没有对应的token，就返回报错
    let pathname = url.parse(req.url).pathname;
    // 配置路由
    if (G[pathname]) {
        G[pathname](req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
        res.end('页面不存在');
    }
};

app.get = (str, cb) => {
    G[str] = cb;
}

app.post = (str, cb) => {
    G[str] = cb;
}

module.exports = app;

