const path = require('path');

module.exports = {
  entry: './built/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
};