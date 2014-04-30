var gulp = require('gulp');
var dgeni = require('dgeni');

gulp.task('dgeni', function() {
  var generateDocs = dgeni.generator('docs/dgeni.conf.js');
  return generateDocs();
});

gulp.task('default', ['dgeni']);