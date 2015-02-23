var path = require('path');
var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var atomshell = require('gulp-atom-shell');
var del = require('rimraf');
var merge = require('merge-stream');
var _ = require('lodash');


var pkg = require('./package.json');

var paths = {
  ts: './src/ts/**/*.ts',
  jade: './src/jade/**/*.jade',
  less: {
    files: './src/less/**/*.less',
    entry: './src/less/index.less'
  },
  assets: './src/static/**/*',
  dist: {
    root: './dist/',
    app: './dist/app/',
    appFiles: './dist/app/**',
    atomshell: './dist/atom-shell',
    zip: './dist/app.zip'
  }
};

gulp.task('clean', function() {
  del.sync(paths.dist.root);
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(paths.dist.app));
});

gulp.task('less', function() {
  gulp.src(paths.less.entry)
    .pipe(plumber())
    .pipe(less({
    }))
    .pipe(gulp.dest(paths.dist.app));
});

gulp.task('copy', function() {
  merge(gulp.src(paths.assets), gulp.src('./package.json'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist.app));
});

gulp.task('watch', ['build'], function() {
  gulp.watch([paths.jade], ['jade']);
  gulp.watch([paths.assets], ['copy']);
  gulp.watch([paths.less.files], ['less']);
});

gulp.task('atomshell', function() {
  return atomshell.download({
      version: '0.21.2',
      platform: 'win32',
      productName: pkg.name,
      productVersion: pkg.version
    })
    .pipe(gulp.dest(paths.dist.atomshell));
});

gulp.task('build', ['clean', 'jade', 'copy', 'less', 'atomshell']);

gulp.task('default', ['build']);
