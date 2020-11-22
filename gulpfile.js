var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var gulpJson = require('gulp-json');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
 
var spritesmith = require('gulp.spritesmith');
 
gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src('input/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.json'
  }));
 
  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('output/'));
 
  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    // .pipe(gulpJson())
    .pipe(gulp.dest('output/'));
 
  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});