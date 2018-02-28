//jshint ignore: start
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var replace = require('gulp-string-replace');
var report = require('jshint-stylish');
var reportHtml = require('gulp-jshint-html-reporter');
deletefile = require('gulp-clean');
const sass=require('gulp-sass');


gulp.task('sass',function(){
    return gulp.src('./source/sass/*scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./source/css'));
});

gulp.task('sass:watch', function(){
    gulp.watch('./source/sass/*.scss', ['sass']);
});

gulp.task('jshint', function () {
    return gulp.src('source/javascript/*.js').pipe(jshint())
        .pipe(jshint.reporter(report));
});

gulp.task('jshintHtml', function () {
    gulp.src('log').pipe(deletefile());
    return gulp.src('source/javascript/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(reportHtml, {
            filename: __dirname + '/log/reportQuality.html',
            createMissingFolders: true
        }));
});
gulp.task('build', function () {
    gulp.src('source/html/*.html')
        .pipe(replace('../css/style.css', 'style.css'))
        .pipe(replace('<script src="../../node_modules/jquery/dist/jquery.js"></script>', '<script src="../node_modules/jquery/dist/jquery.js"></script>'))
        .pipe(replace('<script src="../javascript/index.js"></script>', '<script src="bundle.js"></script>'))
        .pipe(replace('<script src="../../node_modules/jquery-easy-loading/dist/jquery.loading.js"></script>', '<script src="../node_modules/jquery-easy-loading/dist/jquery.loading.js"></script>'))
        .pipe(replace('../../node_modules/jquery-easy-loading/dist/jquery.loading.css', '../node_modules/jquery-easy-loading/dist/jquery.loading.css'))
        .pipe(gulp.dest('dist'));
    gulp.src('source/css/*.css').pipe(gulp.dest('dist'));
    gulp.src('source/javascript/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(uglify()).pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});


