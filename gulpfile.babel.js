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
import svgSprite from 'gulp-svg-sprites';
import svg2png from 'gulp-svg2png';
import filter from 'gulp-filter';

const basePaths = {
  src: 'src/',
  serve: '_site/',
  dest: 'assets/'
};

const paths = {
  sass: {
    src: `${basePaths.src}scss/app.scss`,
    site: `${basePaths.site}${basePaths.dest}css/`,
    dest: `${basePaths.dest}css/`
  },
  js: {
    src: `${basePaths.src}js/app.js`,
    dest: `${basePaths.dest}js/`
  },
  img: {
    src: `${basePaths.src}img/**/*.{jpg,png,gif,bitmap,svg}`,
    dest: `${basePaths.dest}img/`
  },
  svg: {
    src: `${basePaths.src}svg/*.svg`,
    dest: `${basePaths.src}img/`,
    sass: `scss/_sprite.scss`,
    png: `${basePaths.src}img/sprite.svg`
  }
}

const watch = {
  svg: `${paths.svg.src}`,
  sass: `${basePaths.src}/scss/**/*.scss`,
  js: `${basePaths.src}`,
  img: `${paths.img.src}`,
  folders: ['./*','assets/css/*', '_posts/*.md', '_layouts/*.html', '_includes/*.html']
};

const defaultTasks = ['convert2png','sass', 'js', 'imagemin', 'browser-sync', 'watch'];

const buildTasks = ['convert2png','sass', 'js', 'imagemin', 'jekyll-build'];

gulp.task('jekyll-build', shell.task(['jekyll build']));

gulp.task('jekyll-rebuild', ['jekyll-build'], () => { browserSync.reload() });

gulp.task('svgSprites', () => {
  return gulp.src(paths.svg.src)
    .pipe(svgSprite({
      padding: '10',
      baseSize: 15,
      cssFile: paths.svg.sass,
      svg: {
        sprite: 'img/sprite.svg'
      }
    }))
    .pipe(gulp.dest(basePaths.src))
    .pipe(filter("img/**/sprite.svg"))
    .pipe(svg2png())
    .pipe(gulp.dest(basePaths.src));
});

gulp.task('convert2png', ['svgSprites'] , () =>{
  return gulp.src(paths.svg.png)
    .pipe(svg2png())
    .pipe(gulp.dest(paths.svg.dest));
});

gulp.task('sass', () => {
  return gulp.src(paths.sass.src)
    .pipe(sass({style: 'compress',includePaths: ['scss'],onError: browserSync.notify}))
    .pipe(prefix(['last 15 versions','> 1%','ie 8','ie 7'],{cascade: true}))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.sass.site))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(paths.sass.dest));

});

gulp.task('browser-sync', ['sass', 'jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: basePaths.serve
    }
  });
});

gulp.task('js', () => {
  return gulp.src(paths.js.src)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('imagemin', () => {
  return gulp.src(paths.img.src)
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progessive: true, interlaced: true }))
    .pipe(gulp.dest(paths.img.dest));
});

gulp.task('watch', () => {
  gulp.watch([paths.svg.png, watch.svg], ['convert2png']);
  gulp.watch(watch.sass, ['sass']);
  gulp.watch(watch.js, ['js']);
  gulp.watch(watch.img, ['imagemin']);
  gulp.watch(watch.folders, ['jekyll-rebuild']);
});

gulp.task('build', buildTasks);
gulp.task('default', defaultTasks);