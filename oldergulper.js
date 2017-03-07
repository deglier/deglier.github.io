var gulp            =   require('gulp');
var browserSync     =   require('browser-sync');
var prefix          =   require('gulp-autoprefixer');
var concat          =   require('gulp-concat');
var jade            =   require('gulp-jade');
var plumber         =   require('gulp-plumber');
var uglify          =   require('gulp-uglify');
var imagemin        =   require('gulp-imagemin');
var sass            =   require('gulp-sass');
var cssmin          =   require('gulp-cssmin');
var cp              =   require('child_process');
var shell           =   require('gulp-shell');

var messages = {
    jekyllBuild: '<span style="color: grey">Rodando:</span> $ jekyll build'
};


gulp.task('jekyll-build', shell.task([
    'jekyll build'
]));
/*
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});
*/
/**
 * Refaz o site e atualiza a página
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
});

gulp.task('sass', function() {
    return gulp.src('src/scss/app.scss')
        .pipe(sass({ style: 'compressed',
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssmin())
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});


gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
* minifica e concatena o js
*/

gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

/**
* otimiza imagens
*/
gulp.task('imagemin', function() {
    return gulp.src('src/img/**/*.{jpg,png,gif}')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img/'));
});

/**
* vigia tudo à procura de mudanças e tarefa default
*/


gulp.task('watch', function () {
    gulp.watch('src/scss/**', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
    gulp.watch(['./*', '_posts/*.md', '_layouts/*.html', '_includes/*.html'], ['jekyll-rebuild']);
});

gulp.task('default', ['sass', 'js', 'imagemin', 'browser-sync', 'watch']);