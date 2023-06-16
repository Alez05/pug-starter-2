const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const jsonData = require('./webpack.data.js')
const embedStyles = require('./webpack.style.js')

module.exports = merge(commonConfig, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
      templateParameters: {
        ...jsonData,
        embedStyles,
        isProduction: false,
      },
      inject: true,
    }),
  ],
})
