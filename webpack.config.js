const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve('./src/main.js'),

  output: {
    filename: 'js/bundle.js'
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html')
    }),

    new CleanWebpackPlugin()
  ],

  mode: 'development'
}