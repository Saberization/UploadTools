const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('compass', function () {
    gulp.src('./js/*.js')  //获取文件，同时过滤掉.min.js文件
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));  //输出文件
});

gulp.task('default', ['compass']);