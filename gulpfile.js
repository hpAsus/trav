'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');

// BROWSER SYNC
// =====================================================================================================================
gulp.task('browser-sync', function () {

    browserSync({
        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://hpasus',
        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,
        notify: false,
        browser: 'google chrome'
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// BABEL
// =====================================================================================================================
gulp.task('babel', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

// DEFAULT
// =====================================================================================================================
gulp.task('default', function () {
    gulp.watch('src/**/*.js',   ['babel']);
});
