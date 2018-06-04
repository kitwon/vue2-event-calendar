const VueLoaderPlugin = require('vue-loader/lib/plugin')

const styleLoader = ['vue-style-loader', 'css-loader', 'postcss-loader']

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: 'vue-loader'
      },
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.css$/,
        use: styleLoader
      },
      {
        test: /\.less$/,
        use: styleLoader.concat(['less-loader'])
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
