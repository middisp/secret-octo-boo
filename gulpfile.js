var gulp = require('gulp'),
 less = require('gulp-less'),
 minifyCSS = require('gulp-minify-css'),
 rename = require('gulp-rename'),
 uglify = require('gulp-uglify'),
 concat = require('gulp-concat');

gulp.task('build-css', function() {
	gulp.src('less/app.less')
		.pipe(less())
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('styles'))
});

gulp.task('process-js', function() {
	gulp.src('scripts/utilities.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('scripts/test'))
});

gulp.task('watch', function() {
	gulp.watch('less/**/*.less', ['build-css']);
});

gulp.task('default', ['build-css', 'process-js', 'watch']);