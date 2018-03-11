var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('watch', function () {
    // Endless stream mode
    watch('./scss/**/*.scss').on('change', function() {
      gulp.start('sass');
    });
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    watch('./scss/**/*.scss').on('change', function() {
      gulp.start('sass');
    });
    // watch("css/**/*.css").on('change', browserSync.reload);
    // watch("**/*.html").on('change', browserSync.reload);
});
