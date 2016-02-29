const gulp = require('gulp');
const path_join = require('path').join;
const $ = require('gulp-load-plugins')();
const pngquant = require('imagemin-pngquant');

const PATHS =  {
    BASE_SRC: 'src',
    BASE_DIST: 'dist',
    SCRIPTS: 'scripts/',
    STYLES: 'styles/',
    PHASER: {
      LIB: 'vendor/phaser-ninja-physics.min.js',
      MAP: 'vendir/phaser-ninja-physics.map'
    },
    HTML: 'index.html',
    ASSETS: 'assets/',
    IMAGES: 'assets/images/',
    FONTS: 'assets/fonts/'
};

gulp.task('default', ['build'], function (cb) {
 cb();
});

gulp.task('build', [
    'webpack',
    'html',
    'images',
    'phaser',
    'fonts',
    'styles'
   ], function (cb) {
    cb();
});

gulp.task('webpack', function () {
   return gulp.src(path_join(PATHS.BASE_SRC, PATHS.SCRIPTS, 'index.js'))
    .pipe($.webpack(require('./webpack.config.js')))
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

gulp.task('phaser', ['phaser-map'], function () {
   return gulp.src(PATHS.PHASER.LIB)
    .pipe(gulp.dest(path_join(PATHS.BASE_DIST, PATHS.SCRIPTS)));
});

gulp.task('phaser-map', function(cb) {

   if (process.env.NODE_ENV !== 'production') {
    return gulp.src(PATHS.PHASER.MAP)
        .pipe(gulp.dest(path_join(PATHS.BASE_DIST, PATHS.SCRIPTS)));
   }

  // cb();
});

gulp.task('fonts', function () {
   return gulp.src(path_join(PATHS.BASE_SRC, PATHS.FONTS) + '**/*.TTF')
    .pipe($.fontmin())
    .pipe(gulp.dest(path_join(PATHS.BASE_DIST, PATHS.FONTS)));
});

gulp.task('styles', function () {
   return gulp.src(path_join(PATHS.BASE_SRC, PATHS.STYLES, 'index.less'))
    .pipe($.less())
    .pipe($.minifyCss())
    .pipe(gulp.dest(path_join(PATHS.BASE_DIST, PATHS.STYLES)));
});
