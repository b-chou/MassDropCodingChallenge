const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./src/components/index.js'],
  output: {
    path: path.join(__dirname, './src/bundle'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
};
