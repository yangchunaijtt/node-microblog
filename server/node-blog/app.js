const http = require("http");
const app = require('./module/routes');
const handBlogServer = require('./src/router/blog');
const handleUserServer = require('./src/router/user');


//注册web服务
http.createServer(app).listen(3000);

//博客
app.get('/api/blog/getList', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    handBlogServer(req, res);
})
app.post('/api/blog/update', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    handBlogServer(req, res);
})
app.post('/api/blog/delete', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    handBlogServer(req, res);
})
app.post('/api/blog/add', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    handBlogServer(req, res);
})

//用户
app.post('/api/user/login', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    handleUserServer(req, res);
})


console.log('server in localhost:3000');

// 需要配置 cross-env  nodemon