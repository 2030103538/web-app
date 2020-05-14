const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/baidu_api',
        createProxyMiddleware({
            target: 'http://api.map.baidu.com/telematics/v3',
            changeOrigin: true,
            pathRewrite: {
                '^/baidu_api': '/'
            }
        })
    );
};