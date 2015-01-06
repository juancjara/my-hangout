var gulp = require('gulp');
var stylus = require('gulp-stylus');

var stylusDir = './public/styles/src/*.styl'

gulp.task('css', function () {
  gulp.src(stylusDir)
    .pipe(stylus({compress: false}))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('watch', function() {
  gulp.watch(stylusDir, ['css'])
});

gulp.task('default', ['watch']);