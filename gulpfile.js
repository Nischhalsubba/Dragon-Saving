"use strict";
// Initailize Modules
const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
var replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
// const uglify = require('gulp-uglify');
const terser = require ('gulp-terser');
const imagemin = require("gulp-imagemin");
const browsersync = require("browser-sync").create();

// File path variables
const files = {
    scssPath: './assets/sass/**/*.scss',
    jsPath: './assets/js/**/*.js',
    imgPath: './assets/Images/**'
}

// sass task
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dest/'));
}

// JS task
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('app.js'))
        .pipe(terser())
        .pipe(dest('./js/'));
}

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Optimize Images
function images() {
    return src(files.imgPath)
        .pipe(
            imagemin([
                imagemin.gifsicle({
                    interlaced: true
                }),
                imagemin.optipng({
                    optimizationLevel: 5
                }),
                imagemin.svgo({
                    plugins: [{
                        removeViewBox: false,
                        collapseGroups: true
                    }]
                })
            ])
        )
        .pipe(dest("./dest/Images/"));
}

// cachebusting task
const cbString = new Date().getTime();

function cacheBustTask() {
    return src(['./*.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString)) //using gulp replace plugin to prevent caching (using regex /'what we looking for' 'cb=' 'looking for any number' '\d'+/g)=> looking for nth number of digit
        //replace('what we are looking for ','what are replacing with')
        .pipe(dest('.'));
}

// watch task
function watchTasks() {
    watch([files.scssPath, files.jsPath,files.imgPath],
        parallel(scssTask, jsTask,images,images)
    );
}

// Default task
exports.default = series(
    parallel(scssTask, jsTask),
    cacheBustTask,
    watchTasks,
    images,
)