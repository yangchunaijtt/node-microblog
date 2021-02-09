const redis = require('redis');
const { redis_config } = require("../conf/db")

// 连接
const redisClient = redis.createClient(redis_config.port, redis_config.host)
redisClient.on('error', (err) => {
    console.log(err)
})

const get = (key) => {
    return new Promise((resolve,reject) => {
        redisClient.get(key, (err, val) => {
            if(err){
                reject(err);
            };
            if(!val){
                resolve(null)
            }
            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }
        })
    })
};


const set = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print)
};

module.exports = {
    get,
    set
}