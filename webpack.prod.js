const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common.js')
const jsonData = require('./webpack.data.js')
const embedStyles = require('./webpack.style.js')

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
      templateParameters: {
        ...jsonData,
        embedStyles,
        isProduction: true,
      },
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
})
