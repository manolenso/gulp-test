var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var convert = require('gulp-rsvg');
var watch = require('gulp-watch');
var notify = require('gulp-notify');



gulp.task('sass', function() {
    return gulp.src('sass/main.sass')
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefixer('last 10 version'))
        .pipe(minifycss())
        .pipe(gulp.dest('css'));
});

gulp.task('pdf', function() {
    return gulp.src('svg/**/*.svg')
        .pipe(convert({
            format: 'pdf'
        }))
        .pipe(gulp.dest('pdf'));
});

gulp.task('png', function() {
    return gulp.src('svg/**/*.svg')
        .pipe(convert({
            format: 'png'
        }))
        .pipe(gulp.dest('png'));

});

gulp.task('default', function() {
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch('svg/**/*.svg', ['pdf']);
    gulp.watch('svg/**/*svg', ['png']);
});

gulp.task('watch', function(){
    gulp.start('sass', 'pdf', 'png');

});



