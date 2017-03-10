'use strict';



//importa os plugins para as tarefas

var env = require('minimist')(process.argv.slice(2))
import gulp from 'gulp';
import browserSync from 'browser-sync';
import prefix from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import jade from 'gulp-jade';
import plumber from 'gulp-plumber';
import duojs from 'gulp-duo';
import duoBabel from 'duo-babel';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import cssmin from 'gulp-cssmin';
import shell from 'gulp-shell';
import svgSprite from 'gulp-svg-sprites';
import svg2png from 'gulp-svg2png';
import filter from 'gulp-filter';
import gulpCopy from 'gulp-copy';
import sourcemaps from 'gulp-sourcemaps';

const basePaths = {
  src: 'src/',
  serve: '_site/',
  dest: 'assets/'
};

const watch = {
  fonts: `${basePaths}fonts/*`,
  svg: `${basePaths.src}svg/*svg`,
  sass: `${basePaths.src}/scss/**/*.scss`,
  js: `${basePaths.src}js/`,
  img: `${basePaths.src}img/**/*.{jpg,png,gif,svg}`,
  folders: ['./*','assets/css/*', '_posts/*.md', '_layouts/*.html', '_includes/*.html']
};

const defaultTasks = ['convert2png', 'copyFonts', 'sass', 'js', 'imagemin', 'browser-sync', 'watch'];
const buildTasks = ['convert2png', 'copyFonts', 'sass', 'js', 'imagemin', 'jekyll-build'];


//inicio das tasks
gulp.task('jekyll-build', shell.task(['jekyll build']));

gulp.task('jekyll-rebuild', ['jekyll-build'], () => { browserSync.reload() });

gulp.task('copyFonts', () => {
  return gulp.src(`${basePaths.src}fonts/**/*.{svg,ttf,eot,woff,css}`)
    .pipe(gulp.dest(`${basePaths.dest}fonts/`));
});

gulp.task('svgSprites', () => {
  return gulp.src(`${basePaths.src}svg/*.svg`)
    .pipe(svgSprite({
      padding: '10',
      baseSize: 15,
      cssFile: `scss/_sprite.scss`,
      svg: { sprite: 'img/sprite.svg'}
    }))
    .pipe(gulp.dest(basePaths.src))
    .pipe(filter("img/**/sprite.svg"))
    .pipe(svg2png())
    .pipe(gulp.dest(basePaths.src));
});

gulp.task('convert2png', ['svgSprites'] , () =>{
  return gulp.src(`${basePaths.src}img/sprite.svg`)
    .pipe(svg2png())
    .pipe(gulp.dest(`${basePaths.src}img/`));
});

gulp.task('sass', () => {
  return gulp.src(`${basePaths.src}scss/app.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({style: 'compress',includePaths: ['scss'],onError: browserSync.notify}))
    .pipe(prefix(['last 15 versions','> 1%','ie 8','ie 7'],{cascade: true}))
    .pipe(cssmin())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${basePaths.dest}css/`))
    .pipe(gulp.dest(`${basePaths.serve}assets/css/`))
    .pipe(browserSync.reload({stream:true}));

});

gulp.task('browser-sync', ['sass', 'jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: basePaths.serve
    }
  });
});

gulp.task('js', () => {
  return gulp.src((env.p) ? `${basePaths.src}js/**/*.js` : [`${basePaths.src}js/**/*.js`, '!src/js/analytics.js'])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${basePaths.dest}js/`));
});

gulp.task('imagemin', () => {
  return gulp.src(`${basePaths.src}img/**/*.{jpg,png,svg,gif}`)
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progessive: true, interlaced: true }))
    .pipe(gulp.dest(`${basePaths.dest}img/`));
});

gulp.task('watch', () => {
  gulp.watch(watch.fonts, ['copyFonts'])
  gulp.watch(watch.svg, ['convert2png']);
  gulp.watch(watch.sass, ['sass']);
  gulp.watch(watch.js, ['js']);
  gulp.watch(watch.img, ['imagemin']);
  gulp.watch(watch.folders, ['jekyll-rebuild']);
});

gulp.task('build', buildTasks);
gulp.task('default', defaultTasks);