var path = require('canonical-path');
var basePath = path.resolve(__dirname, '..');
var basePackage = require('dgeni-packages/ngdoc');


module.exports = function(config) {
  config = basePackage(config);
  config.set('logging.level', 'info');

  // Add in your own template folders if you want to overridge the ngdoc ones
  config.prepend('rendering.templateFolders', [
    path.resolve(__dirname, 'templates')
  ]);

  // This tells dgeni where to look for stuff
  config.set('basePath', __dirname);
  config.set('source.projectPath', '.');

  config.set('source.files', [
    { pattern: 'js/**/*.js', basePath: basePath }
  ]);

  // And where to put stuff
  config.set('rendering.outputFolder', '../build/');
  config.set('rendering.contentsFolder', 'docs/');

  return config;
};