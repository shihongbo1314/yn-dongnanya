const path = require('path');
// 在vue.config.js中没有配置 resolve 方法， 需要自定义一个
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    devServer: {
        host: 'localhost',            // 启动时使⽤的域名
        port: 8080,                 // 指定端⼝号 
    },
    chainWebpack: (config) => {
        // set svg-sprite-loader
        config.module.rules.delete('svg'); // 重点:删除默认配置中处理svg
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons')) // 处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            });
    },
}