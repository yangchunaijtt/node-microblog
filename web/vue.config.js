module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.124.21:8000', // 跨域地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }


}