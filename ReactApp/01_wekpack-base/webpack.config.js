const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//在内存中生index.html,并自动导入打包后的.js文件

const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), //要在内存中生成的文件原路径
    filename: 'index.html', //内存中的文件名
});

module.exports = {
    mode: 'development',
    //webpack 4.x 中，有一个很大的特性，默认的入口文件就是 ./src/index.js
    // entry:'./src/main.js'

    plugins:[
        htmlPlugin,
    ]
};