const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const fs = require('fs')
const sass = require('sass')
const yaml = require('js-yaml')

// The path to your JSON files
let dataDirectory = path.join(__dirname, './src/data')

// Get the list of JSON files
let dataFiles = fs
  .readdirSync(dataDirectory)
  .filter(
    (file) =>
      file.endsWith('.json') || file.endsWith('.yml') || file.endsWith('.yaml')
  )

// Combine all the JSON data into a single object
let jsonData = {}
for (let file of dataFiles) {
  let filePath = path.join(dataDirectory, file)
  let data
  if (file.endsWith('.json')) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
    data = yaml.load(fs.readFileSync(filePath, 'utf8'))
  }
  jsonData[file.replace('.json', '').replace('.yml', '').replace('.yaml', '')] =
    data
}

let embedStyles = fs.readFileSync('./src/embed.scss', 'utf8')
// Use a sass compiler to convert the SCSS to CSS
embedStyles = sass.renderSync({ data: embedStyles }).css.toString()

module.exports = {
  entry: './src/index.js',
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
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
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
