const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), //要在内存中生成的文件原路径
    filename: 'index.html', //内存中的文件名
});

module.exports = {
    mode: 'development',
    //webpack 4.x 中，有一个很大的特性，默认的入口文件就是 ./src/index.js
    // entry:'./src/main.js'

    plugins: [
        htmlPlugin, //在内存中生index.html,并自动导入打包后的.js文件
    ],

    //所有第三方模块的配置规则
    module: {
        rules: [
            //使用第三方babel-loader来解析.js或者.jsx的文件，排除 /node_modules/ 路径下的文件
            { test: /\.js|jsx$/, use: "babel-loader", exclude: /node_modules/ },
            //使用CSS样式的第三方loader,通过 ? 追加参数 modules 表示为普通的CSS样式表，启用模块化.但是这对于第三方样式表的使用带来了不便，
            //所有我们一般只对自定义的样式进行模块化，所以自定义样式的文件改为.scss, 然后新增 .scss loader
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.scss$/, use: ["style-loader", "css-loader?modules", "sass-loader"]},
            
            //处理字体文件的第三方loader
            { test: /\.ttf|woff|woff2|eot|svg$/, use: "url-loader" },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'], //这几种文件后缀名，可以不写
        alias: { //定义别名
            '@': path.join(__dirname, '/src') //这样 @ 就代表了项止根路径中的src这层目录,在import中就可以使用。
        }
    }
};