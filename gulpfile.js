var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// gulp.task("build-production", ["build", "compressjs", "compresscss", "compressimages"]);
gulp.task("build", ["browserify"]);
// gulp.src('./assets/**/*.js').pipe(uglify()).pipe(gulp.dest('./build'));

gulp.task('browserify', function () {		// browserify should have a .babelrc type file or package.json
    return browserify({entries: './src/assets/js/Main.js', debug: true}) // Browserify website for entries and debug **ignore OUTPUT
        .transform(babelify)
        .bundle()
        .on("error", function (err) { console.log("Error: " + err.message); })
        .pipe(source('./js/Application.js')) //'application.' + Date.now() + '.min.js'
        .pipe(gulp.dest('dist'));
});

// gulp.task("watch", ["build", "watch-js"]);
gulp.task('watch', ['build'], function () {
    gulp.watch('./src/assets/**/*.js', ['build']);
});

gulp.task('default', ['watch']);