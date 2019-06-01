var fs = require('fs'),
    gulp = require('gulp'),
    minifyCss = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    pxtorem = require('gulp-pxtorem'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    pump = require('pump');


    var pxtoremOptions = {
        replace: true,
        propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing', 'height', 'width', 'margin', 'padding']
    };

    var postcssOptions = {
    };

    /* SCSS Path */
    var paths = {
        scss: 'scss/style.scss'
    };

var reload = browserSync.reload; // For manual browser reload.

// minify js task
gulp.task('minify-js', function () {
    gulp.src('js/*.js') // path to your file
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(rename('simpleFilter.min.js'))
        .pipe(browserSync.reload({
          stream: true
        }))
        .pipe(gulp.dest('dist/')); 
});


/* Sass task */
gulp.task('sass', function () {
  return gulp.src('scss/style.scss')
  .pipe(rename('style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// task
gulp.task('minify-css', ['sass'], function () {
    gulp.src('css/style.css') // path to your file
        .pipe(minifyCss())
        .pipe(pxtorem(pxtoremOptions, postcssOptions))
        .pipe(autoprefixer({
			browsers: ['> 1%', 'IE 9', 'IE 10', 'IE 11', 'iOS 7', 'iOS 6'],
			cascade: false
		}))
        .pipe(rename('main.min.css'))
        .pipe(browserSync.reload({
          stream: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('browserSync', function() {
    browserSync.init({
      proxy: 'localhost/simpleButtonFilter',
      port: 8888
    })
})

gulp.task('watch', ['sass', 'minify-css', 'minify-js','browserSync'], function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('./scss/style.scss', ['sass']);
  gulp.watch('css/style.css', ['minify-css']);
  gulp.watch('js/*.js', ['minify-js']);
  gulp.watch(['./**/*.html', './**/*.php']).on('change', browserSync.reload);
});
gulp.task('build', ['sass', 'minify-css', 'minify-js']);
