// 处理用户接口的地方
const { successModel, errorModel } = require('../model/resModel');

const login = ({ username, password }) => {
    return new successModel({
        data: {
            token: 'sdasdsadsadsadsa',
        },
        message: 'login'
    });
}

module.exports = {
    login
}