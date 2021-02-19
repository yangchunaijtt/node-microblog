//  封装mysql操作的公共函数
const mysql = require('mysql');
const {  mysql_config } = require('../conf/db');

const mysqlFnc = (sql) => {
    // 测试连接
    return new Promise((resolve, reject) => {
        const client = mysql.createConnection(mysql_config);
        client.connect();
        console.log('sql===',sql);
        client.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result)
            client.end();
        }
        );
    })
}

const escape = (value) => {
    return mysql.escape(value)
}

module.exports = {
    mysqlFnc,
    escape
};