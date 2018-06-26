const path = require('path')

module.exports = {
  entry: './front/index.jsx', // assumes your entry point is the index.js in the root of your project folder
  output: {
    path: __dirname,
    filename: './public/bundle.js' // assumes your bundle.js will also be in the root of your project folder
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.join(__dirname, 'node_modules)')
    },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
      }
    ],
  }
};
