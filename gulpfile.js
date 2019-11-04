const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');


function script() {
    return gulp.src(['./scripts/**/*.js'])
        .pipe(concat('js_core_api.js'))
        .pipe(gulp.dest('./app/script/'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './app/',
        }
    });
    script();
    gulp.watch('./scripts/**/*.js', script);
    gulp.watch('./scripts/**/*.js').on('change', browserSync.reload);
    gulp.watch('./app/**/*.html').on('change', browserSync.reload);
}

exports.watch = watch;
