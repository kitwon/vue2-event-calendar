const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const resolve = filepath => path.resolve(__dirname, '..', filepath)

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: resolve('dev/index.js'),
  output: {
    filename: '[name].js',
    path: resolve('docs')
  },
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: 1234,
    host: 'localhost',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('dev/index.html')
    })
  ]
})
