const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const resolve = filepath => path.resolve(__dirname, '..', filepath)

module.exports = merge(baseConfig, {
  entry: resolve('src/index.js')
})
