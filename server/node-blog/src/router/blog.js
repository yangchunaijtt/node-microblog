// /api/blog/
const url = require('url');
const querystring = require('querystring');
const {
    getBlogDetails,
    getBlogList,
    updateBlog,
    deleteBlog,
    addBlog
} = require('../controller/blog');
const { successModel, errorModel } = require('../model/resModel');
const { get, set } = require('../db/redis');
// details

const handBlogServer = async (req, res) => {
    const routerAllUrl = req.url;
    const routeMethod = req.method;
    const routeUrl = routerAllUrl.split('?')[0];

    let token = req.cookie.token;
    if (!token) {
        res.end(JSON.stringify(new errorModel({
            message: '未登录，请先登录'
        })));
        return
    }
    const getResult = await get(token);
    if (!getResult) {
        res.end(JSON.stringify(new errorModel({
            message: '未登录，请先登录'
        })));
        return
    }
    if (routeMethod === 'GET') {

        const params = url.parse(req.url, true).query;
        if (routeUrl === '/api/blog/getList') {

            getBlogList({
                author: params.author ? params.author : '',
                keyword: params.keyword ? params.keyword : ''
            }).then(result => {
                res.end(JSON.stringify(result))
            }).catch(error => {
                res.end(JSON.stringify(error))
            })
        }
        //详情
        if (routeUrl === '/api/blog/details') {

            getBlogDetails({
                id: params.id
            }).then(result => {
                res.end(JSON.stringify(result))
            }).catch(error => {
                res.end(JSON.stringify(error))
            })
        };

    }

    // post 请求部分
    req.body = '';
    req.createtime = Date.now();
    // 监听请求
    req.on('data', function (chunk) {
        req.body += chunk;
    });
    // 接受参数
    req.on('end', function () {
        req.body = JSON.parse(JSON.stringify(req.body));
        if (routeMethod === 'POST') {
            req.body = JSON.parse(req.body);

            // 修改
            if (routeUrl === '/api/blog/update') {
                updateBlog({
                    id: req.body.id,
                    title: req.body.title,
                    content: req.body.content,
                }).then(result => {
                    res.end(JSON.stringify(result))
                }).catch(error => {
                    res.end(JSON.stringify(error))
                })
            };
            // 删除
            if (routeUrl === '/api/blog/delete') {
                deleteBlog({
                    id: req.body.id
                }).then(result => {
                    res.end(JSON.stringify(result))
                }).catch(error => {
                    res.end(JSON.stringify(error))
                })
            }
            // 新增
            if (routeUrl === '/api/blog/add') {
                addBlog({
                    title: req.body.title,
                    content: req.body.content,
                    createtime: req.createtime,
                    author: req.body.author
                }).then(result => {
                    res.end(JSON.stringify(result))
                }).catch(error => {
                    res.end(JSON.stringify(error))
                })
            };
        }
    });
}

module.exports = handBlogServer;