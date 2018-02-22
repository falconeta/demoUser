//jshint ignore: start
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var replace = require('gulp-string-replace');


gulp.task('jshint', function () {
    return gulp.src('source/javascript/userGenerator.js').pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish')),
        gulp.src('source/javascript/index.js').pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('build', function () {
    gulp.src('source/html/*.html')
        .pipe(replace('../css/style.css', 'style.css'))
        .pipe(replace('<script src="../javascript/userGenerator.js"></script>', ''))
        .pipe(replace('<script src="../javascript/index.js"></script>', '<script src="bundle.js"></script>'))
        .pipe(gulp.dest('dist'));
    gulp.src('source/css/*.css').pipe(gulp.dest('dist'));
    gulp.src('source/javascript/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(uglify()).pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});


