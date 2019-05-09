process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
var config = require('../config/webpack.config');
var chalk = require('chalk');
var paths = require('../config/paths');
var detect = require('detect-port');
var clearConsole = require('react-dev-utils/clearConsole');
var inquirer = require('react-dev-utils/inquirer');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var getProcessForPort = require('react-dev-utils/getProcessForPort');
var isInteractive = process.stdout.isTTY;
var compiler = webpack(config);
var fs = require('fs');
var useYarn = fs.existsSync(paths.yarnLockFile);
var cli = useYarn ? 'yarn' : 'npm';
var openBrowser = require('react-dev-utils/openBrowser');


// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

var DEFAULT_PORT = process.env.PORT || 8082;

function setupCompiler(host, port, protocol) {
  var isFirstCompile = true;

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('beforeCompile', function() {
    if (isInteractive) {
      clearConsole();
    }
  });

  compiler.plugin('beforeRun', function() {
    if (isInteractive) {
      clearConsole();

    }
  });
  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', function(stats) {
    // console.log('formatting message from stats: ', stats.toJson())
    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    var messages = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    var showInstructions = isSuccessful && (isInteractive || isFirstCompile);

    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
      openBrowser(protocol + '://' + host + ':' + port + '/');
    }

    if (showInstructions) {
      isFirstCompile = false;
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log('To create a production build, use ' + chalk.cyan(cli + ' run build') + '.');
      console.log();
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach((message) => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach((message) => {
        console.log(chalk.yellow(message));
        console.log();
      });
      // Teach some ESLint/Stylelint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log('ESlint:');
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
      console.log('Stylelint:');
      console.log('Use ' + chalk.yellow('/* stylelint-disable-next-line */') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* stylelint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}

function runDevServer(host, port, protocol) {
  var devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: true,
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === 'https',
    host: host
  });

  // Required for the local server to 'see' our files.
  devServer.listen(port, (err, result) => {
    if (err) {
      console.log(chalk.red(err));
    }
  });
}

function run(port) {
  var protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  var host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
detect(DEFAULT_PORT).then((port) => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  if (isInteractive) {
    clearConsole();
    
    function changePort(answer) {
      if (answer.newPort) {
        console.log(chalk.green('Using port: ' + port + ' instead.'));
        run(port);
      }
    }

    var existingProcess = getProcessForPort(DEFAULT_PORT);
    var askChangePort =
      chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.' +
        ((existingProcess) ? ' Probably:\n  ' + existingProcess : '')) +
      '\n\nWould you like to run the app on another port instead?';

    const questions = [
      {
        message: askChangePort,
        type: 'confirm',
        name: 'newPort',
        validate: (shouldChangePort) => {
          return shouldChangePort !== '';
        }
      }
    ];

    inquirer.prompt(questions).then(changePort);
  } else {
    console.log(chalk.red('Something is already running on port ' + DEFAULT_PORT + '.'));
  }
});