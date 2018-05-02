//modules
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const uglifyjs = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const pump = require('pump');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');

//paths
const paths = {
  cssLibSrc: 'src/libs/**/*.css',
  jsLibSrc: 'src/libs/**/*.js',
  root: '/',
  src: 'public/assets',
  scripts: 'src/js/*.js',
  sass: 'src/sass/**/*.scss',
  sassSrc: 'src/sass/style.scss'
};

//// DEVELOPMENT gulp.tasks ////

// combine css libraries - DEVELOPMENT
gulp.task('libraries-css-development', (cb) => {
  pump([
      gulp.src(paths.cssLibSrc),
      sourcemaps.init(),
      concat('lib.min.css'),
      sourcemaps.write(paths.root),
      gulp.dest(paths.src)
    ],
    cb
  );
});

// combine js libraries - DEVELOPMENT
gulp.task('libraries-js-development', (cb) => {
  pump([
      gulp.src(paths.jsLibSrc),
      sourcemaps.init(),
      concat('lib.min.js'),
      sourcemaps.write(paths.root),
      gulp.dest(paths.src)
    ],
    cb
  );
});

// concat custom js - DEVELOPMENT
gulp.task('scripts-development', (cb) => {
  pump([
      gulp.src(paths.scripts),
      sourcemaps.init(),
      concat('all.min.js'),
      sourcemaps.write(paths.root),
      gulp.dest(paths.src)
    ],
    cb
  );
});

//compile sass - DEVELOPMENT
gulp.task('sass-development', () => {
  gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write(paths.root))
    .pipe(gulp.dest(paths.src))
    .pipe(livereload());
});

//// PRODUCTION gulp.tasks/ ///

// combine css libraries - PRODUCTION
gulp.task('libraries-css-production', (cb) => {
  pump([
      gulp.src(paths.cssLibSrc),
      concat('lib.min.css'),
      gulp.dest(paths.src)
    ],
    cb
  );
});

// combine js libraries - PRODUCTION
gulp.task('libraries-js-production', (cb) => {
  pump([
      gulp.src(paths.jsLibSrc),
      concat('lib.min.js'),
      gulp.dest(paths.src)
    ],
    cb
  );
});

// minify & concat custom js - PRODUCTION
gulp.task('scripts-production', (cb) => {
  pump([
      gulp.src(paths.scripts),
      concat('all.min.js'),
      uglifyjs(),
      gulp.dest(paths.src)
    ],
    cb
  );
});

//compile sass - PRODUCTION
gulp.task('sass-production', () => {
  gulp.src(paths.sassSrc)
    .pipe(autoprefixer())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.src));
});

//define watch gulp task
gulp.task('watch', () => {
  //live reloader
  livereload.listen();
  //watch for changes in js
  gulp.watch(paths.scripts, ['scripts-development']);
  //watch for changes in sass
  gulp.watch(paths.sass, ['sass-development']);
});

//define default gulp task
gulp.task('default', ['libraries-css-development', 'libraries-js-development', 'scripts-development', 'sass-development']);

//define default gulp task
gulp.task('production', ['libraries-css-production', 'libraries-js-production', 'libraries-production', 'scripts-production', 'sass-production']);
