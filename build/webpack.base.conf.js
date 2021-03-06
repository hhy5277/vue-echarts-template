/*
   webpack 基础配置文件
*/
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

// 封装生成绝对路径函数
function resolve(dir) {
   return path.join(__dirname, '..', dir);
}

module.exports = {
   // 入口
   entry: {
      app: './src/main.js'
   },
   // 出口配置
   output: {
      // 编译后的输出路径等
      path: config.build.assetsRoot,
      filename: '[name].js',
      chunkFilename: utils.assetsPath('js/[name].js'),
      // 发布路径
      publicPath:
         process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
   },
   resolve: {
      // 自动补全扩展名
      extensions: ['.js', '.vue', '.json'],
      // 模块别名，简化模块引入
      alias: {
         vue$: 'vue/dist/vue.esm.js',
         '@': resolve('src')
      }
   },
   // 模块处理规则配置
   module: {
      rules: [
         {
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre', // 先执行
            include: [resolve('src'), resolve('test')],
            options: {
               formatter: require('eslint-friendly-formatter')
            }
         },
         {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig // 规则在 vue-loader.conf.js 中
         },
         {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
         },
         {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
         },
         {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
         },
         {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
         },
         {
            test: require.resolve(config[process.env.NODE_ENV === 'production' ? 'build' : 'dev'].defaultRequestPath),
            loader: `imports-loader?basicRequestHost=>${JSON.stringify(config[process.env.NODE_ENV === 'production' ? 'build' : 'dev'].basicRequestHost)}`
         }
      ]
   }
};
