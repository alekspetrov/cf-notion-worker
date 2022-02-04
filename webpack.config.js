const path = require('path')

module.exports = {
  target: 'webworker',
  entry: path.resolve(__dirname, './src/index.js'),
  resolve: {
    extensions: ['.js', '.ts'],
  },
}
