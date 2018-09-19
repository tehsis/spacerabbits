const gulp = require('gulp');
const path_join = require('path').join;
const $ = require('gulp-load-plugins')();
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const pngquant = require('imagemin-pngquant');

const PATHS =  {
    BASE_SRC: 'src',
    BASE_DIST: 'dist',
    SCRIPTS: 'scripts/',
    STYLES: 'styles/',
    PHASER: {
      LIB: 'vendor/phaser-ninja-physics.min.js',
      MAP: 'vendor/phaser-ninja-physics.map'
    },
    HTML: 'index.html',
    ASSETS: 'assets/',
    IMAGES: 'assets/images/',
    SOUNDS: 'assets/sounds/',
    FONTS: 'assets/fonts/'
};

gulp.task('default', ['build'], function (cb) {
 cb();
});

gulp.task('build', [
    'webpack',
    'html',
    'images',
    'sounds',
    'fonts',
   ], function (cb) {
    cb();
});

gulp.task('webpack', function () {
   return gulp.src(path_join(PATHS.BASE_SRC, PATHS.SCRIPTS, 'index.js'))
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe($.replace('phaser_swipe_1.default', 'phaser_swipe_1'))
    .pipe(gulp.dest('.'));
});

gulp.task('html', function () {
   return gulp.src(path_join(PATHS.BASE_SRC, PATHS.HTML))
    .pipe($.htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeAttributeQuotes: true
    }))
    .pipe(gulp.dest(PATHS.BASE_DIST));
});

gulp.task('images', function () {
   return gulp.src(path_join(PATHS.BASE_SRC, PATHS.IMAGES) + '**/*')
    .pipe($.imagemin({
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path_join(PATHS.BASE_DIST, PATHS.IMAGES)));
});

gulp.task('sounds', function () {
   return gulp.src(path_join(PATHS.BASE_SRC, PATHS.SOUNDS) + '**/*')
    .pipe(gulp.dest(path_join(PATHS.BASE_DIST, PATHS.SOUNDS)));
});


gulp.task('fonts', function () {
   return gulp.src(path_join(PATHS.BASE_SRC, PATHS.FONTS) + '**/*')
    .pipe($.fontmin())
    .pipe(gulp.dest(path_join(PATHS.BASE_DIST, PATHS.FONTS)));
});

gulp.task('styles', function () {
    const styles = path_join(PATHS.BASE_SRC, PATHS.STYLES, 'index.less');
    return gulp.src(styles)
        .pipe($.watch(styles))
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.minifyCss())
        .pipe(gulp.dest(path_join(PATHS.BASE_DIST, PATHS.STYLES)));
});
