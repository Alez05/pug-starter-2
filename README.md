# Pug Starter with Webpack

This is a starter template for web developers who want to use Pug and Webpack for their projects. It provides a development environment with hot module reloading and a build process to generate production-ready assets.

## Features

- Write HTML templates using Pug (formerly Jade) syntax.
- Bundle JavaScript modules using Webpack.
- Compile Sass stylesheets to CSS.
- Automatic reloading of changes during development.
- Separate development and production configurations.
- Environment-specific variables using `.env` and `.env-local` files.
- Customizable template structure and file naming conventions.

## Getting Started

### Prerequisites

- Node.js (v12 or higher) installed on your machine.
- Familiarity with JavaScript, HTML, and CSS.

### Installation

1. Clone this repository to your local machine:

   ```shell
   git clone <repository-url> my-new-project
   ```

1. Change to the project directory:

   ```shell
   cd pug-starter-webpack
   ```

1. Install the required dependencies:

   ```shell
   npm i
   ```

## Usage

### Development Mode

To start the development server with hot module reloading, run the following command:

```shell
npm start
```

This will compile the Pug templates, Sass stylesheets, and JavaScript modules and start a local development server at http://localhost:3000.

Any changes you make to the Pug, Sass, or JavaScript files will trigger an automatic reload in the browser.

### Production Build

To create a production-ready build of your project, run the following command:

```shell
npm run build
```

This will compile and optimize your assets and generate a dist directory containing the bundled JavaScript, CSS, and HTML files.

The production build is optimized for performance and can be deployed to a web server or hosting platform.

## Customization

### HTML Templates

The Pug templates are located in the source-code directory. You can customize the structure and file naming conventions according to your needs.

The `index.pug` file will generate `index.html` in the root of the `dist` directory.

All other `.pug` files will generate a directory named after the original file and an `index.html` file inside it.

### Styling

The starter template includes an `embed.scss` file, which is compiled to CSS and injected as a <style> tag in the head of each HTML file.

You can customize the styles by modifying the `embed.scss` file or by creating additional Sass files and importing them into `embed.scss`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a pull request or submit an issue on GitHub.

## License

This project is licensed under the MIT License.

Feel free to use this complete README.md content in your project and make any necessary modifications to fit your specific needs.
