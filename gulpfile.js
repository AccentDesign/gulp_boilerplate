var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less'); // if you have to use less
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

// paths

var basePath = {
    src: 'wwwroot/css/',
    dest: 'wwwroot/css/'
};

var files = {
    src: 'style.scss',
    dest: 'style.css'
}

var paths = {
    styles: {
        src: basePath.src + files.src,
        allsass: basePath.src + '*.scss',
        allless: basePath.src + '*.less',
        dest: basePath.dest + files.dest
    }
}

// tasks

gulp.task('sass-process', function() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(concat(files.dest))
        .pipe(gulp.dest(basePath.dest))
});

gulp.task('less-process', function() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(concat(files.dest))
        .pipe(gulp.dest(basePath.dest))
});

gulp.task('css-compress', function() {
    return gulp.src(paths.styles.dest)
        .pipe(cssmin())
        .pipe(concat(files.dest))
        .pipe(gulp.dest(basePath.dest))
});

gulp.task('css-prefix', function() {
    return gulp.src(paths.styles.dest)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(basePath.dest))
});

gulp.task('css-sourcemap', function() {
    return gulp.src(paths.styles.dest)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(basePath.dest))
});


// SASS

gulp.task('sass-process-prod', function(callback) {
    runSequence('sass-process', 'css-compress', 'css-prefix', callback);
});

gulp.task('sass-process-dev', function(callback) {
    runSequence('sass-process', 'css-prefix', 'css-compress', 'css-sourcemap', callback);
});

gulp.task('sass-watch-dev', function() {
    gulp.watch(paths.styles.allsass,['sass-process-dev']);
});

gulp.task('sass-watch-prod', function() {
    gulp.watch(paths.styles.allsass,['sass-process-prod']);
});

// LESS

gulp.task('less-process-prod', function(callback) {
    runSequence('less-process', 'css-compress', 'css-prefix', callback);
});

gulp.task('less-process-dev', function(callback) {
    runSequence('less-process', 'css-prefix', 'css-compress', 'css-sourcemap', callback);
});

gulp.task('less-watch-dev', function() {
    gulp.watch(paths.styles.allless,['less-process-dev']);
});

gulp.task('less-watch-prod', function() {
    gulp.watch(paths.styles.allless,['less-process-prod']);
});
