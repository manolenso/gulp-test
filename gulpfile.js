var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var convert = require('gulp-rsvg');
var watch = require('gulp-watch');
var notify = require('gulp-notify');

var paths={
   svgIn: 'sources/svg/*.svg',
   pngOut: 'public/png',
   pdfOut: 'public/pdf',
};

gulp.task('sass', function() {
    return gulp.src('sass/main.sass')
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefixer('last 10 version'))
        .pipe(minifycss())
        .pipe(gulp.dest('css'));
});

gulp.task('pdf', function() {
    return gulp.src(paths.svgIn)
        .pipe(convert({
            format: 'pdf'
        }))
        .pipe(gulp.dest(paths.pdfOut));
});

gulp.task('png', function() {
    return gulp.src(paths.svgIn)
        .pipe(convert({
            format: 'png'
        }))
        .pipe(gulp.dest(paths.pngOut));
});

gulp.task('default', function() {
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch(paths.svgIn, ['pdf']);
    gulp.watch(paths.svgIn, ['png']);
});

gulp.task('watch', function(){
    gulp.start('sass', 'pdf', 'png');

});



