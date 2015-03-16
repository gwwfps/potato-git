var path = require('path');
var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var atomshell = require('gulp-atom-shell');
var del = require('del');
var merge = require('merge-stream');
var ts = require('gulp-typescript');
var babel = require("gulp-babel");
var webpack = require('gulp-webpack');
var rename = require("gulp-rename");
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
    app: './dist/resources/app/',
    js: './dist/resources/app/js',
    bundleEntry: './dist/resources/app/js/web/index.js',
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

var tsProject = ts.createProject({
  declarationFiles: false,
  noExternalResolve: true,
  module: 'commonjs',
  target: 'es6'
});

gulp.task('ts', function() {
  return gulp.src(paths.ts)
    .pipe(ts(tsProject)).js
    .pipe(babel({ blacklist: ['strict'] }))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('webpack', ['ts'], function() {
  return gulp.src(paths.dist.bundleEntry)
    .pipe(webpack())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('copy', function() {
  return merge(gulp.src(paths.assets), gulp.src('./package.json'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist.app));
});

gulp.task('watch', ['build', 'watch:only']);

gulp.task('watch:only', function() {
  gulp.watch([paths.jade], ['jade']);
  gulp.watch([paths.assets], ['copy']);
  gulp.watch([paths.less.files], ['less']);
  gulp.watch([paths.ts], ['ts', 'webpack']);
});

gulp.task('atomshell', function() {
  return atomshell.download({
      version: '0.21.2',
      platform: 'win32',
      productName: pkg.name,
      productVersion: pkg.version
    })
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('build', ['clean', 'atomshell', 'jade', 'copy', 'less', 'ts', 'webpack']);

gulp.task('default', ['build']);
