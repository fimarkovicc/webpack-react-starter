const current = process.env.npm_lifecycle_event
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        compress: true,
        hot: true
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}

if(current == 'build') {
    config.mode = 'production'
    config.module.rules[1].use[0] = MiniCssExtractPlugin.loader
    config.plugins.push(
        new MiniCssExtractPlugin({filename: 'main.[hash].css'}),
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin()
    )
}

module.exports = config