module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.170:8000', // 跨域地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }


}