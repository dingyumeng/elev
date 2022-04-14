/**
 * 添加环境变量
 * VUE_APP_NAME 的值为 package.json 中的 name
 */
const package = require('./package.json');
process.env.VUE_APP_NAME = package.name;

// vue config 配置项以及 devServer 处理跨域的示例
module.exports = {
  publicPath: '/',
  devServer: {
    port: 3000,
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
