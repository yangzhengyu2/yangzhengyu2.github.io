let gulp = require("gulp");

let app = {
    src: "./src",
    dist: "./dist"
}

gulp.task("copy1",function(done){
    gulp.src(app.src)
        .pipe(gulp.dest(app.dist));
    gulp.src(app.src + "/**")
        .pipe(gulp.dest(app.dist+"/src"));
    done();
});
gulp.task("copy2",function(done){
    gulp.src(app.src+"/js")
        .pipe(gulp.dest(app.dist));
    gulp.src(app.src+"/css")
        .pipe(gulp.dest(app.dist));
    
    gulp.src(app.src+"/js/**")
        .pipe(gulp.dest(app.dist+"/js"));
    gulp.src(app.src+"/css/**")
        .pipe(gulp.dest(app.dist+"/css"));
    done();
    
});


gulp.task("copy3",function(done){
    gulp.src([`${app.src}/**/*.html`,`${app.src}/**/*.htm`,])
        .pipe(gulp.dest(app.dist));
    done();
});

gulp.task("copy4",function(done){
    gulp.src([`${app.src}/**/*.{html,htm}`])
        .pipe(gulp.dest(app.dist));
    done();
});

let clean = require("gulp-clean");

gulp.task("clean1",function(done){
    gulp.src(app.dist+"/*")
        .pipe(clean());
    done();
})
gulp.task("clean2",function(done){
    gulp.src(app.dist)
        .pipe(clean());
    done();
})
gulp.task("clean3",function(done){
    gulp.src(`${app.dist}/**/*.{html,htm}`)
        .pipe(clean());
    done();
})

let htmlmin = require("gulp-htmlmin");

gulp.task("htmlmin",function(done){
    gulp.src(`${app.src}/**/*.{html,htm}`)
        .pipe(htmlmin({
            removeComments:true,
            collapseWhitespace:true,
            collapseBooleanAttributes:true
        }))
        .pipe(gulp.dest(app.dist));
    done();
})


let cssmin = require("gulp-cssmin");

gulp.task("cssmin",function(done){
    gulp.src(`${app.src}/**/*.css`)
        .pipe(cssmin())
        .pipe(gulp.dest(app.dist));
    done();
})

// 方法一：
// let jsmin = require("gulp-uglify-es");

// gulp.task("jsmin",function(done){

//     gulp.src(`${app.src}/**/*.js`)
    //     .pipe(jsmin.default())
    //     .pipe(gulp.dest(app.dist));
//     done();
// })

// 方法二：

    let { default:jsmin } = require("gulp-uglify-es");
    gulp.task("jsmin",function(done){
        gulp.src(`${app.src}/**/*.js`)
            .pipe(jsmin())
            .pipe(gulp.dest(app.dist))
        done();
    })

let rename = require("gulp-rename");

    gulp.task("rename",function(done){
        gulp.src(`${app.src}/**`)
        .pipe(rename(function(target,info){
            if(target.extname){
                target.extname += ".bak";
            }
        }))
        .pipe(gulp.dest(app.dist))
        done();
    })

let concat = require("gulp-concat");
    gulp.task("concat",function(done){
        gulp.src(`${app.src}/*.css`)
        .pipe(concat("all.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(app.dist));
        
        done();
    })

let less = require("gulp-less")
    gulp.task("less",function(done){
        gulp.src(`${app.src}/less/*.less`)
        .pipe(less())
        .pipe(concat("all.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(app.dist));
        done();
    })

    gulp.task("less1",function(done){
        gulp.src(`${app.src}/less/*.less`)
        .pipe(less())
        .pipe(concat("all.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(app.dist +"/css"))
        done();
    })

// 将src/less/*.less编译并压缩到dist/css/all.min.css
    gulp.task("less2",function(done){
        gulp.src(`${app.src}/less/*.less`)
        .pipe(less())
        .pipe(concat("all.css"))
        .pipe(cssmin())
        .pipe(rename("all.min.css"))
        .pipe(gulp.dest(app.dist +"/css"))
        done();
    })

    gulp.task("less3",function(done){
        gulp.src(`${app.src}/less/*.less`)
        .pipe(less())
        .pipe(concat("all.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(app.dist + "/css"))
        done();
    })