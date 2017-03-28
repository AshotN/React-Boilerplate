'use strict';
require('babel-register');

let gulp = require('gulp');
let stylus = require('gulp-stylus');
let watch = require('gulp-watch');
let cleanCSS = require('gulp-clean-css');
let Couleurs = require('couleurs'); Couleurs.proto();
let size = require('gulp-filesize');
let uglify = require('gulp-uglify');
let browserify  = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let rename = require("gulp-rename");

let paths = {
	stylusWatch: 'src/stylus/**/*.styl',
	stylusEntry: 'src/stylus/index.styl',
	jsWatch: 'src/js/**/*.js',
	jsDestination: 'src/public/assets/scripts',
    cssDestination: 'src/public/assets/css'
};

gulp.task('stylus-compile' , function() {
	console.log("Compiling Stylus".fg(0, 255, 0));
	return gulp.src(paths.stylusEntry)
		.pipe(stylus())
		.pipe(cleanCSS({debug: true}, function(details) {
			console.log(details.name.toString().fg(155, 255, 0) + ' - ' + details.stats.originalSize.toString().fg(255, 100, 0) + ' -> ' + details.stats.minifiedSize.toString().fg(50, 255, 100));
		}))
		.pipe(gulp.dest(paths.cssDestination))
		.pipe(size())
		.on('error', errorHandle);
});

gulp.task('javascript-compile' , function() {
	console.log("Compiling Javascript".fg(0, 255, 0));
	return browserify({entries: paths.browserifyEntry, debug: true})
		.transform("babelify", { presets: ["es2015"] })
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(rename("all.js"))
		.pipe(size())
		.pipe(gulp.dest(paths.jsDestination))
		.on('error', errorHandle);
});


gulp.task('watch' ,function() {
	gulp.watch(paths.stylusWatch, ['stylus-compile']);
	gulp.watch(paths.jsWatch, ['javascript-compile']);
});

gulp.task('default', ['watch', 'stylus-compile', 'javascript-compile']);


function errorHandle(error)
{
	console.log("Error:"+error.toString().fg(255,0,0));
	this.emit('end');
}