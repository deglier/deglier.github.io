var gulp            =   require('gulp');
var browserSync     =   require('browser-sync');
var autoprefixer    =   require('gulp-autoprefixer');
var concat          =   require('gulp-concat');
var jade            =   require('gulp-jade');
var plumber         =   require('gulp-plumber');
var uglify          =   require('gulp-uglify');
var imagemin        =   require('gulp-imagemin');
var cp              =   require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Rodando:</span> $ jekyll build'
};

/*
* Monta o site do jekyll
*/

gulp.task('jekyll-build', function(done){
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
* Refaz o site e atualiza a página
*/

gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
});

/**
* Espera até que o jekyll seja executado e então levanta o sevidor utilizando o _site como past raiz
*/

gulp.task('broser-sync', ['jekyll-build'], function(){
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

gulp.task('imagemin', function(){
    return gulp.src('src/img/**/*')
    .pipe(plumber())
    .pipe(imagemin({ optmizationLevel: 3, progessive: true, interlaced: true }))
    .pipe(gulp.dest('assets/img/'));
});

/**
* vigia tudo à procura de mudanças e tarefa default
*/

gulp.task('watch', function(){
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
    gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '_posts*'], ['jekyll-build']);
});

gulp.task('default', ['js', 'imagemin', 'watch'])