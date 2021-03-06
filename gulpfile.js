const gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    imageMin = require('gulp-imagemin');

gulp.task('styles', function() {
	gulp.src('sass/app.scss')
		.pipe(sass())
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('styles'));
});

gulp.task('scripts', function() {
	gulp.src('scripts/utilities.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('scripts/test'));
});

gulp.task('images', function() {
	gulp.src('img/orig/**/*')
		.pipe(cache(imageMin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('img'));
});

gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('img/orig/**/*', ['images']);
	gulp.watch('scripts/utilities.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'images', 'watch']);