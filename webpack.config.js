const path = require('path');

module.exports = {
  context: __dirname,
  entry: './scripts/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [path.resolve(__dirname, 'functions', 'node_modules'), 'node_modules'],
  },
  mode: 'development',
};
