const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path');
var webpack = require('webpack');


const config = {
    entry: {
        index: ['./assets/js/index.js'],
        dashboard: ['./assets/js/dashboard.js']
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
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components\/)/,
                use: [
                        {
                            loader: 'react-hot-loader/webpack'
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['es2015', 'react', 'stage-2']
                            }
                        }

                ]
            }
        ]
    },
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './public'),
        publicPath: '/static/'
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}

module.exports = config