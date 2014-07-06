var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('default', function() {


});


gulp.task('test', function() {
    var mockgoose = require('mockgoose');
    var mongoose = require('mongoose');
    mockgoose(mongoose);
    gulp.src('./test/*.js')
        .pipe(jasmine())
});