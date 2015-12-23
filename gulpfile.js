'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

var path = {
    EJS: './src/views/index.ejs',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: './dist',
    DEST_VIEWS: './dist/views',
    DEST_BUILD: './dist/build',
    DEST_SRC: './dist/src',
    ENTRY_POINT: 'src/js/main.js',
    CSS: {
        BOOTSTRAP: './node_modules/bootstrap/dist/css/bootstrap.css',
        TOASTR: './node_modules/toastr/build/toastr.css',
        SWEETALERT: './node_modules/sweetalert/dist/sweetalert.css'
    },
    SASS_ENTRY_POINT: './src/css/**/*.scss',
    SRC_JS: './src/**/*.js',
    FONTS_SRC: './src/fonts/**',
    FONTS_DEST: './dist/fonts'
};

// Development

gulp.task('copy', function(){
    gulp.src(path.EJS)
        .pipe(gulp.dest(path.DEST_VIEWS));
});

gulp.task('fonts', function(){
    gulp.src(path.FONTS_SRC)
        .pipe(gulp.dest(path.FONTS_DEST));
});

gulp.task('sass', function () {
    gulp.src(path.SASS_ENTRY_POINT)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('minify-css', function() {
    return gulp.src([path.DEST_SRC + '/**/*.css',
                    path.CSS.BOOTSTRAP,
                    path.CSS.TOASTR,
                    path.CSS.SWEETALERT])
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('lint', function () {
    return gulp.src([path.SRC_JS, '!node_modules/**'])
        .pipe(eslint({config: 'eslint.config.json'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
    gulp.watch(path.EJS, ['copy']);
    gulp.watch(path.SASS_ENTRY_POINT, ['sass']);
    gulp.watch(path.DEST_SRC + '/**/*.css', ['minify-css']);
    gulp.watch(path.SRC_JS, ['lint']);

    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC));
        console.log('Updated');
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('default', ['fonts', 'lint', 'watch']);

// Production

gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('production', ['replaceHTML', 'build']);



