// mysql配置
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev' // Node环境参数

let mysql_config = {};

if (env === 'dev') {
    mysql_config = {
        host: 'localhost',
        port: '3306',
        user: 'yc',
        password: '123qwe',
        database: 'my_blog'
    };
} else if (env === 'production') {
    mysql_config = {
        host: 'localhost',
        port: '3306',
        user: 'yc',
        password: '123qwe',
        database: 'my_blog'
    };
};

// 包含的表
const TEST_TABLE = {
    blogs: 'blogs',
    users: 'users'
}

module.exports = {
    TEST_TABLE,
    mysql_config
};