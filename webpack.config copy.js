const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const fs = require('fs')
const sass = require('sass')
const yaml = require('js-yaml')

const Dotenv = require('dotenv-webpack')

const isProduction = process.env.NODE_ENV === 'production'

// The path to your JSON files
let dataDirectory = path.join(__dirname, './source-code/data')

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

let embedStyles = fs.readFileSync('./source-code/embed.scss', 'utf8')
// Use a sass compiler to convert the SCSS to CSS
embedStyles = sass.renderSync({ data: embedStyles }).css.toString()

function getHtmlPlugins(dirPath) {
  const entries = fs.readdirSync(dirPath)

  return entries.flatMap((entry) => {
    const fullEntryPath = path.join(dirPath, entry)
    const entryStat = fs.statSync(fullEntryPath)

    if (entryStat.isFile() && path.extname(entry) === '.pug') {
      const fileNameWithoutExtension = path.basename(entry, '.pug')
      const relativeDirPath = path.relative(
        path.resolve(__dirname, 'source-code'),
        dirPath
      )

      // Check if the current file is index.pug
      if (fileNameWithoutExtension === 'index') {
        // Handle index.pug separately, output directly to index.html
        return new HtmlWebpackPlugin({
          filename: 'index.html',
          template: fullEntryPath,
          templateParameters: {
            ...jsonData,
            embedStyles,
            isProduction,
          },
          inject: !isProduction,
        })
      }

      // For all other pug files, create a directory named after the original file
      return new HtmlWebpackPlugin({
        filename: path.join(
          relativeDirPath,
          fileNameWithoutExtension,
          'index.html'
        ),
        template: fullEntryPath,
        templateParameters: {
          ...jsonData,
          embedStyles,
          isProduction,
        },
        inject: !isProduction,
      })
    } else if (entryStat.isDirectory()) {
      return getHtmlPlugins(fullEntryPath)
    } else {
      return []
    }
  })
}

module.exports = {
  mode: 'development',
  entry: './source-code/index.js',
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
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
    new Dotenv(),
    ...getHtmlPlugins(path.resolve(__dirname, 'source-code')),

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
      'source-code/data/*.json',
      'source-code/data/*.yml',
      'source-code/data/*.yaml',
    ],
    port: 3000,
  },
}
