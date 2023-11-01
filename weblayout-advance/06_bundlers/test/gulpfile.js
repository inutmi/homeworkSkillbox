const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();


const cleanBuild = () => {
	return del(['build'])
}

const cleanDev = () => {
	return del(['dev'])
}


const resourcesBuild = () => {
  return src('src/resources/**')
  .pipe(dest('build'))
}

const resourcesDev = () => {
  return src('src/resources/**')
  .pipe(dest('dev'))
}


//svg sprite
const svgSprites = () => {
  return src('./src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    .pipe(dest('build/images'));
}


const scriptsBuild = () => {
  return src(
    ['./src/js/components/**.js', './src/js/main.js'])
		.pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(concat('app.js'))
    .pipe(uglify(
    ).on("error", notify.onError()))
    .pipe(dest('build/main'))
}


const stylesBuild = () => {
  return src('./src/styles/**/*.css')
		.pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({ level: 2
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream());
};

const imagesBuild = () => {
  return src([
		'src/images/**/*.jpg',
		'src/images/**/*.png',
		'src/images/**/*.jpeg',
		'src/images/*.svg',
		])
    .pipe(image())
    .pipe(dest('build/images'))
};


//dev
const scriptsDev = () => {
  return src(
    ['./src/js/components/**.js', './src/js/main.js'])
    .pipe(concat('app.js'))
    .pipe(dest('dev/main'))
    .pipe(browserSync.stream());
}

const stylesDev = () => {
  return src('./src/styles/**/*.css')
    .pipe(sourcemaps.init())
		.pipe(concat('main.css'))
    .pipe(dest('dev/css'))
    .pipe(browserSync.stream());
};

const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    }
  })
}

const imagesDev = () => {
  return src([
		'src/images/**/*.jpg',
		'src/images/**/*.png',
		'src/images/**/*.jpeg',
		'src/images/*.svg',
		])
    .pipe(image())
    .pipe(dest('dev/images'))
};

const htmlMinify = () => {
	return src('src/**/*.html')
		.pipe(htmlMin({
			collapseWhitespace: true
		}))
		.pipe(dest('build'))
}

const htmlDev = () => {
	return src('src/**/*.html')
		.pipe(dest('dev'))
		.pipe(browserSync.stream());
}

//dev
watch('./src/*.html', htmlDev);
watch('./src/styles/**/*.css', stylesDev);
watch('./src/js/**/*.js', scriptsDev);
watch('./src/resources/**', resourcesBuild);
watch('./src/resources/**', resourcesDev);
watch('./src/images/svg/**.svg', svgSprites);

exports.cleanBuild = cleanBuild;
exports.cleanDev = cleanDev;
exports.stylesBuild = stylesBuild;
exports.stylesDev = stylesDev;
exports.scriptsDev = scriptsDev;
exports.htmlDev = htmlDev;
exports.default = series(cleanBuild, resourcesBuild, htmlMinify, scriptsBuild, stylesBuild, imagesBuild, svgSprites);
exports.build = series(cleanBuild, resourcesBuild, htmlMinify, scriptsBuild, stylesBuild, imagesBuild, svgSprites);
exports.dev = series(cleanDev, resourcesDev, htmlDev, scriptsDev, stylesDev, imagesDev, svgSprites, watchFilesDev);
