# What is dgeni?

[dgeni](https://github.com/angular/dgeni) is a documentation generator developed by the [Angular team](https://github.com/angular). Ironically it lacks documentation right now, so we try to develop a very simple step-by-step-guide here, until a better documentation is available. Please share and fork this Gist.

dgeni is currently used in these project
- [Angular](https://github.com/angular/angular.js/tree/master/docs)
- [protractor](https://github.com/angular/protractor/tree/master/docs)
- [ionic](https://github.com/driftyco/ionic/tree/master/docs)

# Why should I use dgeni?

dgeni seems to be very flexible, because it has a modular core and its extensibility with plugins. It seems to be relatively technology agnostic, so it should be good for HTML, CSS and JS documentation alike. It should be suitable for server components or REST API documentation, too. With custom plugins you can even create very framework-specific documentation - say treat controllers and directives similar to native primitives in Angular apps.

# How do I install dgeni?

Install [Node](http://nodejs.org/), if you don't have it allready. After that you can install dgeni and an additional module with basic plugins for dgeni called dgeni-packages:

```
$ npm install --save-dev dgeni dgeni-packages
```

# How can I use dgeni with Grunt?

Just create this custom task in your `Gruntfile.js` until an official package is available:

```
  grunt.registerTask('dgeni', 'Generate docs via dgeni.', function() {
    var dgeni = require('dgeni');
    var done = this.async();

    dgeni('docs/docs.config.js')
      .generateDocs()
      .then(done);
  });
```

You can execute this task via:

```
$ grunt dgeni
```

As you can this task will look for a configuration file inside `docs/docs.config.js`. You can change this path, if you wish.

# How can I use dgeni with Gulp?


Just create this custom task in your `gulpfile.js` until an official package is available:

```
var dgeni = require('dgeni');
gulp.task('dgeni', function(done) {
  return dgeni('docs/docs.config.js')
    .generateDocs();
});
```

You can execute this task via:

```
$ gulp dgeni
```

As you can this task will look for a configuration file inside `docs/docs.config.js`. You can change this path, if you wish.

# How can I configure dgeni?

```
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
  config.set('rendering.contentsFolder', 'docs/' + versionData.current.folder);

  return config;
};
```
