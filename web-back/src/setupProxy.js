const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    );
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