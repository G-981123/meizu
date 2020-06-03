let gulp = require("gulp");

gulp.task("watch-all", async () => {
    //监听当前目录下的index.html有没有变化，如果有变化，那么就执行函数里面的代码
    gulp.watch("./src/**/*", async () => {
        //复制文件
        gulp.src("./src/**/*")
            .pipe(gulp.dest("d:\\phpstudy\\WWW\\dest"));
    })
})