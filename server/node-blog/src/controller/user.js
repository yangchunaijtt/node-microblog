// 处理用户接口的地方
const { successModel, errorModel } = require('../model/resModel');
const mysqlFnc = require('../db/mysql');

const tableName ='users'

const login = ({ username, password,token }) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${tableName} WHERE username='${username}' AND password='${password}'`;
        mysqlFnc(sql).then(result => {
            console.log('login==', result);
            // 需要根据result值来判断是否成功
            resolve(new successModel({
                data: {token}
            }));
        }).catch(error => {
            reject(new errorModel({
                data: error
            }))
        })
    })
}

module.exports = {
    login
}