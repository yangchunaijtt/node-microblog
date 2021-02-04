// 处理后台接口数据的地方
const { successModel, errorModel } = require('../model/resModel');

/**
 * 获取
 * @param {*} author 作者
 * @param {*} keyWord 关键字
 */
const getBlogList = ({ author, keyWord }) => {
    return new successModel({
        data: {},
        message: 'getBlogList'
    })

}

// 更新 
const updateBlog = ({ id, title, content, createtime }) => {
    return new successModel({
        data:{},
        message: 'updateBlog'
    })
};

// 删除
const deleteBlog = ({ id }) => {
    return new successModel({
        data: {},
        message: 'deleteBlog'
    })
}

// 新增
const addBlog = ({ id, titile, content, createtime }) => {
    return new successModel({
        data: {},
        message: 'addBlog'
    })
}


module.exports = {
    getBlogList,
    updateBlog,
    deleteBlog,
    addBlog
}