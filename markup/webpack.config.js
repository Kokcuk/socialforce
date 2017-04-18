const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')


const config = {
    entry: {
        index: ['./js/index.js']
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            },
            {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file-loader'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './build'),
        publicPath: '/build'
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
}

module.exports = config