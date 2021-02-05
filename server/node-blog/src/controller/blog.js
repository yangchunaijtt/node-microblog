// 处理后台接口数据的地方
const { successModel, errorModel } = require('../model/resModel');
const mysqlFnc = require('../db/mysql');
/**
 * 获取
 * @param {*} author 作者
 * @param {*} keyWord 关键字
 */

const tableName = 'blogs';

const getBlogList = ({ author, keyWord }) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${tableName} WHERE 1=1 `
        if (author) {
            sql += `AND author LIKE '%${author}%'`
        }
        if (keyWord) {
            sql += `AND title LIKE '%${keyWord}%'`
        }
        sql += `ORDER BY createtime DESC`;
        mysqlFnc(sql).then(result => {
            console.log('getBlogList==', result);
            // 需要根据result值来判断是否成功
            resolve(new successModel({
                data: result
            }));
        }).catch(error => {
            reject(new errorModel({
                data: error
            }))
        })
    })
}

// 查询文章详情
const getBlogDetails = ({ id }) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${tableName} WHERE id=${id}`;
        mysqlFnc(sql).then(result => {
            console.log('getBlogDetails==', result);
            // 需要根据result值来判断是否成功
            resolve(new successModel({
                data: result
            }));
        }).catch(error => {
            reject(new errorModel({
                data: error
            }))
        })
    })
}


// 更新 
const updateBlog = ({ id, title, content }) => {
    // UPDATE blogs SET title='测试标题更新',content='测试内容更新' WHERE id=1;
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${tableName} `
        if (title && content) {
            sql += `SET title="${title}",content="${content}"`
        } else {
            if (title) {
                sql += `SET title="${title}"`;
            };
            if (content) {
                sql += `SET content="${content}"`;
            };
        }
        sql += ` WHERE id=${id};`
        // DELETE  FROM blogs WHERE id=3;
        mysqlFnc(sql).then(result => {
            console.log('updateBlog==', result);
            // 需要根据result值来判断是否成功
            resolve(new successModel({
                data: result
            }));
        }).catch(error => {
            reject(new errorModel({
                data: error
            }))
        })
    })
};

// 删除
const deleteBlog = ({ id }) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE  FROM ${tableName} WHERE id=${id};`
        // DELETE  FROM blogs WHERE id=3;
        mysqlFnc(sql).then(result => {
            console.log('delete==', result);
            // 需要根据result值来判断是否成功
            resolve(new successModel({
                data: result
            }));
        }).catch(error => {
            reject(new errorModel({
                data: error
            }))
        })
    })
}

// 新增
const addBlog = ({ title, content, createtime, author }) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${tableName}(title,content,createtime,author) VALUES("${title}","${content}",${createtime},"${author}");`
        // INSERT INTO blogs(title,content,createtime,author) VALUES('测试文章一','dsadsadsad',1612511309896,'王二麻子');
        mysqlFnc(sql).then(result => {
            // 需要根据result值来判断是否成功
            resolve(new successModel({
                data: result
            }));
        }).catch(error => {
            reject(new errorModel({
                data: error
            }))
        })
    })
}

module.exports = {
    getBlogDetails,
    getBlogList,
    updateBlog,
    deleteBlog,
    addBlog
}