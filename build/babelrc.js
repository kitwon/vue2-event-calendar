module.exports = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions']
        },
        modules: false
      }
    ],
    'stage-2'
  ],
  plugins: ['external-helpers']
}
