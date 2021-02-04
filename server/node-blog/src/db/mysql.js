//  封装mysql操作的公共函数
const mysql = require('mysql');
const { TEST_TABLE, mysql_config } = require('../conf/db');

const mysqlFnc = () => {
    // console.log(mysql_config);
    // 测试连接
    return new Promise((resolve, reject) => {
        const client = mysql.createConnection(mysql_config);
        client.connect();
        client.query('SELECT * FROM  ' + TEST_TABLE.blogs, (err, result) => {
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