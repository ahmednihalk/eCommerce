var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps'); 
var concat = require('gulp-concat');

gulp.task('minify', () => {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minifycss', function () {
    return gulp.src('./src/scss/style.scss*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename('app.min.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css/'))
});




var jsFiles = ['./src/js/**/*'], jsDest = './dist/js/';

gulp.task('scripts', function () {
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(jsDest))
});


gulp.task('copy', function () {
    gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('copy', function () {
    gulp.src('./src/icomoon/fonts/*.**')
        .pipe(gulp.dest('./dist/css/icomoon/fonts'));
});



gulp.task(
    'default',
    gulp.parallel(
        'minifycss',
        'scripts',
        'copy',
        function watchFiles() {
            gulp.watch('./src/index.html', gulp.parallel(['minify']));
            gulp.watch('./src/scss/**/***', gulp.parallel(['minifycss']));
            gulp.watch('./src/js/**/***', gulp.parallel(['scripts']));
            gulp.watch('./src/images/**/*.*', gulp.parallel(['copy']));
            gulp.watch('./src/icomoon/fonts', gulp.parallel(['copy']));
        }
    )
);


