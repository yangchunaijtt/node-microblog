const http = require("http");
const app = require('./module/routes');
const handBlogServer = require('./src/router/blog');


//注册web服务
http.createServer(app).listen(3000);

//配置路由
app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    handBlogServer(req,res);
    // res.end('首页');
})

//配置路由
app.get('/news', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('新闻页面');
})

console.log('server in localhost:3000');

// 需要配置 cross-env  nodemon