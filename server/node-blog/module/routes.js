const url = require('url');

let G = {

};

let app = (req,res) => {
    let pathname = url.parse(req.url).pathname;
    if(G[pathname]) {
        G[pathname](req,res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
        res.end('页面不存在');
    }
};

app.get = (str,cb) => {
    G[str] =cb;
}

module.exports=app;

