var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    devtool: 'eval',
    devServer: {
        contentBase: './dist'
    },
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            }, {
                test: /\.json$/,
                loader: 'json-loader',
                include: path.join(__dirname, 'src')
            },
            { test: /\.css$/, loader: "css-loader" }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ],
        postLoaders: [{
            include: path.resolve(__dirname, 'node_modules/pixi.js'),
            loader: 'transform/cacheable?brfs!ify'
        }]
    }
};
