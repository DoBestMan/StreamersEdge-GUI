const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const Clean = require('clean-webpack-plugin');
const chalk = require('chalk');
const getClientEnvironment = require('./env');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
var publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
var publicUrl = '';
// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);

// COMMON PLUGINS
var plugins = [
  // Makes some environment variables available in index.html.
  // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
  // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  // In development, this will be an empty string.
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  // Generates an `index.html` file with the <script> injected.
  new HtmlWebpackPlugin({
    inject: true,
    template: paths.appHtml
  }),
  new webpack.HotModuleReplacementPlugin(),
  new Clean(),
  new webpack.ProgressPlugin((percentage, msg) => {
    process.stdout.write(chalk.green(
      (percentage * 100).toFixed(2) + '% ' + msg + '                 \033[0G'
    ));
  })
];

module.exports = {
  entry: paths.appIndexJs,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: paths.appSrc
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')(),
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ]}),
                require('stylelint')()
              ]
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/bundle.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath
  },
  plugins: plugins
};