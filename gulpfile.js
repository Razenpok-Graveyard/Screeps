/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");          // Load gulp
var concat = require("gulp-concat"); // Load gulp-concat

gulp.task("sadasd", function () {
    return gulp.src('www/scripts/*.js')
        .pipe(concat('combined.js'))
        .pipe(gulp.dest('min/scripts'));
});