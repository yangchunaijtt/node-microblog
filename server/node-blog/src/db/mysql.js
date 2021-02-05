//  封装mysql操作的公共函数
const mysql = require('mysql');
const { TEST_TABLE, mysql_config } = require('../conf/db');

const mysqlFnc = (sql) => {
    // 测试连接
    return new Promise((resolve, reject) => {
        const client = mysql.createConnection(mysql_config);
        client.connect();
        client.query(sql, (err, result) => {
            console.log('sql==', sql);
            if (err) {
                reject(err);
            }
            resolve(result)
            client.end();
        }
        );
    })
}

module.exports = mysqlFnc;