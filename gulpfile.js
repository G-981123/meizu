// const gulp = require("gulp");
// const html = require("gulp-htmlmin")
// const scss =require("gulp-sass")
// const babel = require("gulp-babel")
// // 压缩html到指定目录
// gulp.task("html",async()=>{
//     gulp.src("./src/*.html")
//     .pipe(html({
//         collapseWhitespace:true
//     }))
//     .pipe(gulp.dest("d:\\phpstudy\\WWW\\dest"))
// })
// //编译sass到指定目录
// gulp.task("scss",async()=>{
//     gulp.src("./src/scss/*.scss")
//     .pipe(scss())
//     .pipe(gulp.dest("d:\\phpstudy\\WWW\\dest\\css"))
// })
// //ES6转ES5
// gulp.task("bable",async()=>{
//     gulp.src('src/js/*.js')
//     .pipe(babel({
//         presets:['@babel/env']
//     }))
//     .pipe(gulp.dest("d:\\phpstudy\\WWW\\dest\\js"))
// })

// gulp.task("watch-all", async () => {
//     //监听当前目录下的index.html有没有变化，如果有变化，那么就执行函数里面的代码
//     gulp.watch("./src/**/*", async () => {
//         //复制文件
//         gulp.src("./src/**/*")
//             .pipe(gulp.dest("d:\\phpstudy\\WWW\\dest"));
//     })
// })
const gulp = require('gulp'); //引入gulp，生成一个gulp对象
const html = require('gulp-minify-html'); //引入html压缩插件  html函数方法
const css = require('gulp-clean-css'); //引入css压缩插件  css函数方法
const sass = require('gulp-sass'); //引入sass编译插件 

//sass
const sourcemaps = require('gulp-sourcemaps'); //引入生成.map文件模块
const plugins = require('gulp-load-plugins')(); //生成.map文件 返回的是一个函数体。需要再次执行。
const script = require('gulp-uglify'); //压缩js的插件


// //es6转es5的三个模块
// //gulp-babel@7   babel-core       babel-preset-es2015
const babel = require('gulp-babel'); //主要
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');


const imagemin = require('gulp-imagemin'); //图片压缩
const watch = require('gulp-watch'); //gulp监听



//1.创建一个简单的gulp任务
// gulp.task('hello', () => {
//     console.log('hello,gulp');
// });

//2.复制文件
// gulp.task('copyfile', () => {
//     return gulp.src('src/**/*')
//         .pipe(gulp.dest('d:\\phpstudy\\WWW\\dest'));
// });

//3.压缩html文件 - 引入插件包
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html')
        .pipe(html()) //执行html插件包
        .pipe(gulp.dest('d:\\phpstudy\\WWW\\dest'));
});

//4.压缩css文件 - 引入插件包
// gulp.task('uglifycss', () => {
//     return gulp.src('src/css/*.css')
//         .pipe(css()) //执行css插件包
//         .pipe(gulp.dest('dist/css'));
// });

//5.sass编译成css - 引入插件包
gulp.task('compilesass', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(plugins.sourcemaps.init()) //初始化gulp-sourcemaps插件
        .pipe(plugins.sass({
            outputStyle: 'compressed' //压缩
        }))
        .pipe(plugins.sourcemaps.write('.')) //通过sourcemaps,生成.map文件
        .pipe(gulp.dest('d:\\phpstudy\\WWW\\dest\\css'));
});


//6.压缩js文件 - 引入插件包
gulp.task('uglifyjs', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({ //先将es6转换成es5
            presets: ['es2015'] //es2015->es6  es2016->es7...
        }))
        .pipe(script()) //执行js压缩
        .pipe(gulp.dest('d:\\phpstudy\\WWW\\dest\\js'));
});

//7.图片压缩 - jpg/gif/bmp/webp/ [png] - imagemin
gulp.task('uglifyimg', () => {
    return gulp.src('src/images/*.{jpg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('d:\\phpstudy\\WWW\\dest\\images'))
});

//8.监听
// 监听插件-gulp-watch()
// 参1:监听的目录，数组的形式
// 参2:通过gulp.parallel()并行监听任务名。
// 监听的任务必须先执行一次，再能进行监听。

//html js scss img
// gulp.task('default', () => {
//     watch(['src/thirdplugins/*.js', 'src/*.html', 'src/sass/*.scss', 'src/script/*.js', 'src/img/*.{jpg,png,gif}'], gulp.parallel('copyfile', 'uglifyhtml', 'compilesass', 'uglifyjs', 'uglifyimg'));
// });


//html js scss
gulp.task('default', () => {
    watch(['src/thirdplugins/*.js', 'src/*.html', 'src/sass/*.scss', 'src/script/*.js'], gulp.parallel( 'uglifyhtml', 'compilesass', 'uglifyjs'));
});

// html cscc
// gulp.task('default', () => {
//     watch(['src/*.html', 'src/scss/*.scss'], gulp.parallel('uglifyhtml', 'compilesass'));
// });