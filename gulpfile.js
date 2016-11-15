var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');



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
        dest: basePath.dest + files.dest
    }
}



gulp.task('sass-process', function() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(concat(files.dest))
        .pipe(gulp.dest(basePath.dest))
});

gulp.task('css-compress', function() {
    return gulp.src(paths.styles.dest)
        .pipe(cssnano())
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

gulp.task('css-process-prod', function(callback) {
    runSequence('sass-process', 'css-compress', 'css-prefix', callback);
});

gulp.task('css-process-dev', function(callback) {
    runSequence('sass-process', 'css-prefix', 'css-compress', 'css-sourcemap', callback);
});

gulp.task('watch-dev', function() {
    gulp.watch(paths.styles.allsass,['css-process-dev']);
});

gulp.task('watch-prod', function() {
    gulp.watch('paths.styles.src',['css-process-prod']);
});
