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

### Styling and Performance Optimization

The styling in the starter template is designed to optimize the critical rendering path and improve the First Contentful Paint (FCP) performance of your web pages.

#### Embedding Critical CSS

The embed.scss file plays a crucial role in optimizing the critical rendering path. It contains the CSS styles that are essential for rendering the above-the-fold content of your web pages. This critical CSS is then compiled into a `<style>` tag and injected directly into the `<head>` section of each HTML file. By embedding the critical CSS, you ensure that the necessary styles are available early in the rendering process, reducing the time it takes for the browser to render the initial content. This can significantly improve the perceived performance of your website.

#### Deferred Styling with look.scss

In addition to the critical CSS, the starter template includes a look.scss file. This file contains non-critical styles that are not required for the initial rendering of the above-the-fold content. Instead of including these styles directly in the embedded CSS, the look.scss file is treated as a deferred style that doesn't block the loading and rendering of the page. It is included as a separate CSS file (main.css) using the `<link> `tag.

By deferring non-critical styles, you allow the browser to prioritize the loading and rendering of the main content without being delayed by unnecessary styles. This approach can help improve the overall performance of your website and provide a smoother user experience.

To customize the styles, you can modify the embed.scss file for critical CSS and create additional Sass files, such as look.scss, for non-critical styles. Remember to import the necessary files into embed.scss or any other entry point file for proper compilation and bundling.

Optimizing the critical rendering path and deferring non-critical styles are important considerations for web performance. By using the provided embedding and deferred styling techniques, you can enhance the loading and rendering experience of your web pages.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a pull request or submit an issue on GitHub.

## License

This project is licensed under the MIT License.

Feel free to use this complete README.md content in your project and make any necessary modifications to fit your specific needs.
