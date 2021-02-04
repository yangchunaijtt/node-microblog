// /api/blog/
const url = require('url');
const querystring = require('querystring');
const {
    getBlogList,
    updateBlog,
    deleteBlog,
    addBlog
} = require('../controller/blog');

const handBlogServer = (req, res) => {
    const routerAllUrl = req.url;
    const routeUrl = routerAllUrl.split('?')[0];
    console.log(routeUrl);
    if (routeUrl === '/api/blog/getList') {
        const params = url.parse(req.url, true).query;
        res.end(JSON.stringify(getBlogList({
            author: params.author ? params.author : '',
            keyword: params.keyword ? params.keyword : ''
        })))
    }

    // post 请求部分
    let post = '';
    // 监听请求
    req.on('data', function (chunk) {
        post += chunk;
    });
    // 接受参数
    req.on('end', function () {
        const postData = querystring.parse(post);
        // 修改
        if (routeUrl === '/api/blog/update') {
            res.end(JSON.stringify(updateBlog({
                id: postData.id,
                title: postData.title,
                content: postData.content,
                createtime: postData.createtime,
            })));
        }
        // 删除
        if (routeUrl === '/api/blog/delete') {
            res.end(JSON.stringify(deleteBlog({
                id: postData.id
            })))
        }
        // 新增
        if (routeUrl === '/api/blog/add') {
            res.end(JSON.stringify(addBlog({
                id: postData.id,
                title: postData.title,
                content: postData.content,
                createtime: postData.createtime,
            })));
        };
    });
}

module.exports = handBlogServer;