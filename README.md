# What is Dgeni?

[Dgeni](https://github.com/angular/dgeni) is a documentation generator developed by the [Angular team](https://github.com/angular). Ironically it lacks documentation right now, so we try to develop a very simple step-by-step-guide here, until a better documentation is available. Please share and fork this repo.

Dgeni is currently used in these projects:
- [Angular](https://github.com/angular/angular.js/tree/master/docs)
- [protractor](https://github.com/angular/protractor/tree/master/docs)
- [ionic](https://github.com/driftyco/ionic/tree/master/docs)

# Why should I use Dgeni?

Dgeni seems to be very flexible, because it has a modular core and its extensibility with plugins. It seems to be relatively technology agnostic, so it should be good for HTML, CSS and JS documentation alike. It should be suitable for server components or REST API documentation, too. With custom plugins you can even create very framework-specific documentation - say treat controllers and directives similar to native primitives in Angular apps.

# How do I install Dgeni?

Install [Node](http://nodejs.org/), if you don't have it allready. After that you can install Dgeni and an additional module with basic plugins for dgeni called dgeni-packages:

```
$ npm install --save-dev dgeni dgeni-packages
```

# How can I use Dgeni with Grunt?

Just create a custom task in your `Gruntfile.js` until an official package is available:

```
  grunt.registerTask('dgeni', 'Generate docs via Dgeni.', function() {
    var dgeni = require('dgeni');
    var done = this.async();

    dgeni('docs/dgeni.conf.js')
      .generateDocs()
      .then(done);
  });
```

You can execute this task via:

```
$ grunt dgeni
```

As you can this task will look for a configuration file inside `docs/dgeni.conf.js`. You can change this path, if you wish.

# How can I use Dgeni with Gulp?


Gulp plugins are specifically for file manipulation with streams.  Dgeni does not process files in a stream like manner so it
is not appropriate to build a Gulp plugin.  Luckily, the way Gulp works it is really easy to run Dgeni from a task:

```
var gulp = require('gulp');
var dgeni = require('dgeni');
gulp.task('dgeni', function() {
  return dgeni('docs/dgeni.conf.js')
    .generateDocs();
});
```

You can execute this task via:

```
$ gulp dgeni
```

As you can this task will run Dgeni, configured with the file at `docs/dgeni.conf.js`. You can change this path, if you wish.

# How can I configure Dgeni?

You must provide a configuration file to tell Dgeni what to do.  Check out the configuration file in this project, at `docs/dgeni.conf.js`.

# How does Dgeni work?


Say we have a `src/` with `app.js` and a `script.js` annotated with jsdocs:

```
// app.js
/**
 * @name log
 * @description This function logs a string.
 */

function log() {
  console.log('Logging.');
}
```

```
// script.js
/**
 * @name helloWorld
 * @description This function returns a string.
 *
 * @returns {string} This string has the value 'Hello World'.
 */

function helloWorld() {
  return 'Hello World';
}
```

We can the Dgeni to read these these files and render docs based on nunjucks-template like this:

```
var path = require('canonical-path');

// What annotations do we want to use? Choose jsdoc for now.
var jsdocPackage = require('dgeni-packages/jsdoc');

module.exports = function(config) {
  // Use jsdocPackage
  config = jsdocPackage(config);

  // Set logging level
  config.set('logging.level', 'info');

  // Add your own templates to render docs
  config.prepend('rendering.templateFolders', [
    path.resolve(__dirname, 'templates')
  ]);

  // You can specifiy which tempate should be used based on a pattern.
  // Currently we just use one template and don't need a pattern
  config.prepend('rendering.templatePatterns', [
    'common.template.html'
  ]);

  // This tells dgeni where to look for stuff
  config.set('source.projectPath', '.');

  config.set('source.files', [
    {
      // Process all js files in src/.
      pattern: 'src/**/*.js',
      basePath: path.resolve(__dirname, '..')
    }
  ]);

  // Our generated docs will be written here:
  config.set('rendering.outputFolder', '../build/');
  config.set('rendering.contentsFolder', 'docs');

  return config;
};
```

Our template sits is placed in `docs/templates/common.template.html` and looks like this:

```
My doc:

<h1>{{ doc.name }}</h1>
<p>{{ doc.description }}</p>
```

Now call your Gulp or Grunt task you will get these files:

```
<!-- build/docs/src/app.html -->
My doc:

<h1>log</h1>
<p>This function logs a string.</p>
```

```
<!-- build/docs/src/script.html -->
My doc:

<h1>helloWorld</h1>
<p>This function returns a string.</p>
```
