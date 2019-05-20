'use strict'
// Template version: 1.3.1
// 文档 http://vuejs-templates.github.io/webpack

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // 开发环境设置
    host: '192.168.1.146',  //'localhost',
    //host: '192.168.1.161',
    port: 8088,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     * https://webpack.js.org/configuration/devtool/#development
     */
    devtool: 'cheap-module-eval-source-map',

    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     * https://webpack.js.org/configuration/devtool/#production
     */
    productionSourceMap: false,
    devtool: '#source-map',

    // 如果想要设置Gzip为true，请:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // 在打包时运行以下命令，查看构建报告:
    // `npm run build --report`
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
