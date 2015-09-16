'use strict';

const gulp = require('gulp'),
  webpack = require('gulp-webpack'),
  sq = require('streamqueue'),
  wrap = require('gulp-wrap-umd'),
  babel = require('gulp-babel'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  gulpFilter = require('gulp-filter');

const files = [
  './src/select2.js',
  './src/date-time.js',
  './src/image-crop.js',
  './src/pegjs.js',
  './src/index.js'
];

const dependencies = [
  'bower_components/select2/dist/js/select2.js',
  'bower_components/cropper/dist/cropper.js',
  'node_modules/datepicker/dist/datepicker.js'
];

gulp.task('build', function () {

  let queue = files.map(file => {
    return gulp.src(file);
  });


  return sq.apply(sq, [{objectMode:true}].concat(queue))
  .pipe(babel({
    loose: ['es6.classes']
  }))
  .pipe(concat('jform.livejazz.js'))
  .pipe(wrap({
    namespace: 'livejazz',
    exports: "Form",
    deps: [
      { name: 'jquery', globalName: 'jQuery', paramName: '$' },
      { name: 'jform', globalName: 'jform', paramName: 'jform' }
    ]
  })).pipe(rename('jform.livejazz.js'))
  .pipe(gulp.dest('./dist'));

});

gulp.task('bundle', function () {
  let queue = dependencies.concat(files).map(file => {
    return gulp.src(file);
  });

  var filter = gulpFilter(['*', '!bower_components', '!node_modules'], {restore: true});

  return sq.apply(sq, [{objectMode:true}].concat(queue))
  .pipe(filter)
  .pipe(babel({
    loose: ['es6.classes']
  }))
  .pipe(filter.restore)
  .pipe(concat('jform.livejazz.bundle.js'))
  .pipe(wrap({
    namespace: 'livejazz',
    exports: "Form",
    deps: [
      { name: 'jquery', globalName: 'jQuery', paramName: '$' },
      { name: 'jform', globalName: 'jform', paramName: 'jform' }
    ]
  })).pipe(rename('jform.livejazz.bundle.js'))
  .pipe(gulp.dest('./dist'));

})

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function () {
  gulp.watch('./src/**/*.js', ['build']);
});


gulp.task('watch', function () {
  gulp.watch('./src/**/*js', ['bundle'])
})
