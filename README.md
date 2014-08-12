# What is Dgeni?

[Dgeni](https://github.com/angular/dgeni) is a documentation generator developed by the
[Angular team](https://github.com/angular). Ironically it lacks documentation right now, so we
try to develop a very simple step-by-step-guide here, until a better documentation is
available. Please share and fork this repo.

Dgeni is currently used in these projects:
- [Angular](https://github.com/angular/angular.js/tree/master/docs)
- [protractor](https://github.com/angular/protractor/tree/master/docs)
- [ionic](https://github.com/driftyco/ionic)
- [famous-angular](https://github.com/Famous/famous-angular)

# Why should I use Dgeni?

Dgeni seems to be very flexible, because it has a modular core and its extensibility with
plugins. It seems to be relatively technology agnostic, so it should be good for HTML, CSS and
JS documentation alike. It should be suitable for server components or REST API documentation,
too. With custom plugins you can even create very framework-specific documentation - say treat
controllers and directives similar to native primitives in Angular apps.

# How do I install Dgeni?

Install [Node](http://nodejs.org/), if you don't have it allready. After that you can install
Dgeni and an additional module with basic plugins for Dgeni called `dgeni-packages`:

```bash
$ npm install --save-dev dgeni dgeni-packages
```

# How can I use Dgeni with Grunt?

There is no official grunt task but using Dgeni with Grunt is pretty simple.
Just create a custom task in your `Gruntfile.js`:

```js
grunt.registerTask('dgeni', 'Generate docs via dgeni.', function() {
  var done = this.async();
  var dgeni = new Dgeni([require('./dgeni-example')]);
  dgeni.generate().then(done);
});
```

You can execute this task via:

```bash
$ grunt dgeni
```

This task will load a Dgeni package at `docs/dgeni-example.js`, which tells Dgeni what to
generate.

# How can I use Dgeni with Gulp?


Gulp plugins are specifically for file manipulation with streams.  Dgeni does not process files
in a stream-like manner so it is not appropriate to build a Gulp plugin. Luckily, the way Gulp
works it is really easy to run Dgeni from a task:

```js
gulp.task('dgeni', function() {
  var dgeni = new Dgeni([require('./dgeni-example')]);
  return dgeni.generate();
});
```

You can execute this task via:

```bash
$ gulp dgeni
```

This task will load a Dgeni package at `docs/dgeni-example.js`, which tells Dgeni what to
generate.

# How can I configure Dgeni?

Dgeni processing is configured by Dgeni Packages. You must provide at least one
Package to tell Dgeni what files to read and how to process them. Check out the `dgeni-example`
package in this project, at `docs/dgeni-example.js`.

# How does Dgeni work?

Say we have a `src/` with `app.js` and a `script.js` annotated with jsdocs:

```js
// app.js
/**
 * @name log
 * @description This function logs a string.
 */

function log() {
  console.log('Logging.');
}
```

```js
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

We can tell Dgeni to read these these files and render docs based on nunjucks-templates by
defining our own Dgeni Package:

```js
// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');

var Package = require('dgeni').Package;

// Create and export a new Dgeni package called dgeni-example. This package depends upon
// the jsdoc and nunjucks packages defined in the dgeni-packages npm module.
module.exports = new Package('dgeni-example', [
  require('dgeni-packages/jsdoc'),
  require('dgeni-packages/nunjucks')
])

// Configure our dgeni-example package. We can ask the Dgeni dependency injector
// to provide us with access to services and processors that we wish to configure
.config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor) {

  // Set logging level
  log.level = 'info';

  // Specify the base path used when resolving relative paths to source and output files
  readFilesProcessor.basePath = path.resolve(__dirname, '..');

  // Specify collections of source files that should contain the documentation to extract
  readFilesProcessor.sourceFiles = [
    {
      // Process all js files in `src` and its subfolders ...
      include: 'src/**/*.js',
      // ... except for this one!
      exclude: 'src/do-not-read.js',
      // When calculating the relative path to these files use this as the base path.
      // So `src/foo/bar.js` will have relative path of `foo/bar.js`
      basePath: 'src'
    }
  ];

  // Add a folder to search for our own templates to use when rendering docs
  templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

  // Specify how to match docs to templates.
  // In this case we just use the same static template for all docs
  templateFinder.templatePatterns.unshift('common.template.html');

  // Specify where the writeFilesProcessor will write our generated doc files
  writeFilesProcessor.outputFolder  = 'build';
});
```

We have a single nunjucks template that is used to render the documents. It is stored in
`docs/templates/common.template.html` and looks like this:

```html
<h1>{{ doc.codeName }} ({{ doc.outputPath }})</h1>
<p>{{ doc.description }}</p>

{% if doc.params %}
<h2>Params</h2>
<ul>
{% for param in doc.params %}
<li>
  <strong>{{ param.name }}</strong> { {{ param.typeList }} } - {{ param.description }}
</li>
{% endfor %}
</ul>
{% endif %}

{% if doc.returns %}
<h2>Returns</h2>
<p>
  { {{ doc.returns.typeList }} } - {{ doc.returns.description }}
</p>
{% endif %}
```

When we run Dgeni (say by running the Gulp or Grunt task defined above) you will get the
following files, which refer to each of the jsdoc blocks that were read from the files:

**greet.html**
```html
<h1>greet (greet.html)</h1>
<p>Display a greeting</p>

<h2>Params</h2>
<ul>
  <li>
    <strong>name</strong> { string } - The name of the person to greet
  </li>
</ul>
```

**helloWorld.html**
```html
<h1>helloWorld (helloWorld.html)</h1>
<p>This function returns a string.</p>

<h2>Returns</h2>
<p>
  { string } - This string has the value 'Hello World'.
</p>
```

**log.html**
```html
<h1>log (log.html)</h1>
<p>This function logs a string.</p>
```

**myApp.html**
```html
<h1>myApp (myApp.html)</h1>
<p>My application</p>
```
