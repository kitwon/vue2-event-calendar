module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      }
    ]
  }, {
    test: /\.less$/,
    use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
