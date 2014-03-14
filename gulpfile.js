var gulp = require('gulp');
var dgeni = require('dgeni');

gulp.task('default', function() {
  return dgeni('docs/dgeni.conf.js')
    .generateDocs();
});