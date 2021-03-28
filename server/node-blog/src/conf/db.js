// mysql配置
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev' // Node环境参数

let mysql_config = {};
let redis_config = {};

if (env === 'dev') {
    mysql_config = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'my_blog'
    };
    redis_config = {
        port: 6379,
        host: '127.0.0.1'
    };
} else if (env === 'production') {
    mysql_config = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'my_blog'
    };
    redis_config = {
        port: 6379,
        host: '127.0.0.1'
    };
};

// 包含的表
const TEST_TABLE = {
    blogs: 'blogs',
    users: 'users'
}

module.exports = {
    TEST_TABLE,
    mysql_config,
    redis_config
};