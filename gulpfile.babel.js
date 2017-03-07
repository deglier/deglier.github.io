'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import prefix from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import jade from 'gulp-jade';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import cssmin from 'gulp-cssmin';
import shell from 'gulp-shell';

const dirs = {
  src: 'src',
  site: '_site',
  dest: 'assets'
}

const sassPaths = {
  src: `${dirs.src}/scss/app.scss`,
  site: `${dirs.site}/assets/css/`,
  dest: `${dirs.dest}/css/`
};

const jsPaths = {
  src: `${dirs.src}/js/**/*.js`,
  dest: `${dirs.dest}/js/`
};

const imgPaths = {
  src: `${dirs.src}/img/**/*.{jpg,png,gif}`,
  dest: `${dirs.dest}/img/`
};

const watch = {
  sass: `${dirs.src}/scss/**`,
  js: `${jsPaths.src}`,
  img: `${imgPaths.src}`,
  folders: ['./*', '_posts/*.md', '_layouts/*.html', '_includes/*.html']
};

const defaultTasks = ['sass', 'js', 'imagemin', 'browser-sync', 'watch'];

gulp.task('jekyll-build', shell.task(['jekyll build']));

gulp.task('jekyll-rebuild', ['jekyll-build'], () => { browserSync.reload() });

gulp.task('sass', () => {
  return gulp.src(sassPaths.src)
    .pipe(sass({style: 'compress',includePaths: ['scss'],onError: browserSync.notify}))
    .pipe(prefix(['last 15 versions','> 1%','ie 8','ie 7'],{cascade: true}))
    .pipe(cssmin())
    .pipe(gulp.dest(sassPaths.site))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(sassPaths.dest));

});

gulp.task('browser-sync', ['sass', 'jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: dirs.site
    }
  });
});

gulp.task('js', () => {
  return gulp.src(jsPaths.src)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('imagemin', () => {
  return gulp.src(imgPaths.src)
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progessive: true, interlaced: true }))
    .pipe(gulp.dest(imgPaths.dest));
});

gulp.task('watch', () => {
  gulp.watch(watch.sass, ['sass']);
  gulp.watch(watch.js, ['js']);
  gulp.watch(watch.img, ['imagemin']);
  gulp.watch(watch.folders, ['jekyll-rebuild']);
});

gulp.task('default', defaultTasks);