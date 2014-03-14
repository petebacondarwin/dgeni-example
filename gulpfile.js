var gulp = require('gulp');
var dgeni = require('dgeni');

gulp.task('dgeni', function() {
  return dgeni('docs/dgeni.conf.js')
    .generateDocs();
});

gulp.task('default', ['dgeni']);