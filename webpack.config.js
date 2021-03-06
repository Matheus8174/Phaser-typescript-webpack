const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve('./src/main.ts'),

  output: {
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: ['jsx', '.tsx', '.ts', '.js']
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      fix: true
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html')
    }),

    new CleanWebpackPlugin()
  ],

  mode: 'development'
};
