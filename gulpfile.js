/**
 * Created by hasee on 2016/10/29.
 */
var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    // imageminJpegtran = require('imagemin-jpegtran'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache')//图片压缩缓存
    ;

gulp.task('dev', function () {
    return gulp.src('./*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('img', function () {
    gulp.src('./img/*.{png,jpg}')
        .pipe(cache(imagemin({
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片  ,imageminJpegtran({progressive: true})
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('default',function(){
    gulp.start('img','dev');
});


