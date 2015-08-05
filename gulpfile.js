var gulp = require('gulp'),
 less = require('gulp-less'),
 minifyCSS = require('gulp-minify-css'),
 rename = require('gulp-rename'),
 uglify = require('gulp-uglify'),
 concat = require('gulp-concat'),
 cache = require('gulp-cache'),
 imageMin = require('gulp-imagemin');

gulp.task('styles', function() {
	gulp.src('less/app.less')
		.pipe(less())
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('styles'))
});

gulp.task('scripts', function() {
	gulp.src('scripts/utilities.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('scripts/test'))
});

gulp.task('images', function() {
	gulp.src('img/orig/**/*')
		.pipe(cache(imageMin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('img'))
})

gulp.task('watch', function() {
	gulp.watch('less/**/*.less', ['styles']);
	gulp.watch('img/orig/**/*', ['images']);
});

gulp.task('default', ['styles', 'scripts', 'images', 'watch']);