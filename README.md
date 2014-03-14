# What is Dgeni?

[Dgeni](https://github.com/angular/dgeni) is a documentation generator developed by the [Angular team](https://github.com/angular). Ironically it lacks documentation right now, so we try to develop a very simple step-by-step-guide here, until a better documentation is available. Please share and fork this Gist.

Dgeni is currently used in these project
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

You must provide a configuration file to tell Dgeni what to do.  Check out the configuration file in this project, at `docs/dgeni.conf`.