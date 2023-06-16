const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // Set the mode to development or production
  entry: {
    bundle: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    filename: '[name].js', //
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.pug'], // Add the .pug extension
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // good to know!!!
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /.s[ac]ss$/i,
        exclude: /embed\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require.resolve('sass'),
            },
          },
        ],
      },
      {
        test: /embed\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require.resolve('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new HtmlWebpackPlugin({
      title: 'Webpack 5 Boilerplate',
      filename: 'index.html',
      template: './src/index.pug',
    }),
  ],
  devServer: {
    static: './dist', // Serve files from the dist directory
    hot: true, // Enable hot module replacement
    watchFiles: [
      '**/*.pug',
      'src/data/*.json',
      'src/data/*.yml',
      'src/data/*.yaml',
    ],
    port: 3000,
  },
}
