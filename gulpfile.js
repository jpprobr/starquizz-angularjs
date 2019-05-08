(function () {
    'use strict';

    var endpoint = {
        domain: {
            integrated: 'http://localhost:3000/',
            dist: 'http://localhost:3000/'
        }
    };
    
    console.log('\nIniciando serviço local...');

    var applicationPath = 'app';
    var contextDist = '/starquizz/';
    var contextLocal = '/';

    var distPath = 'PackageTmp';

    var gulp = require('gulp'),
        liveServer = require('gulp-live-server'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        concat = require('gulp-concat'),
        cleanCSS = require('gulp-clean-css'),
        copy = require('gulp-copy'),
        replace = require('gulp-replace'),
        rename = require('gulp-rename'),
        fileInclude = require('gulp-file-include'),
        htmlBuild = require('gulp-htmlbuild'),
        htmlmin = require('gulp-htmlmin'),
        zip = require('gulp-zip'),
        files = {
            // js
            vendorJS: [
                'node_modules/angular/angular.min.js',
                'node_modules/angular-resource/angular-resource.min.js',
                'node_modules/angular-route/angular-route.min.js',
                'node_modules/angular-sanitize/angular-sanitize.min.js',
                'node_modules/angular-i18n/angular-locale_pt-br.js',
                'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.min.js',
                'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                'node_modules/angular-ui-mask/dist/mask.min.js',
                'node_modules/angular-ui-validate/dist/validate.min.js',
                'node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js',
                'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
                'node_modules/angular-cookies/angular-cookies.min.js',
                'node_modules/moment/min/moment.min.js',
                'node_modules/angular-moment/angular-moment.min.js',
                'node_modules/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
                'node_modules/angular-base64/angular-base64.min.js',
                'node_modules/sweetalert/dist/sweetalert.min.js'
            ],
            defaultJS: [
                // app
                applicationPath + '/js/App.js',
                // configurations
                applicationPath + '/js/configurations/*',
                // constants
                applicationPath + '/js/constants/*',
                // directives
                applicationPath + '/js/directives/*',
                // services
                applicationPath + '/js/services/*',
                // factories
                applicationPath + '/js/factories/*',
                // filters
                applicationPath + '/js/filters/*',
                // controllers
                applicationPath + '/js/controllers/ModalCtrl.js',
                applicationPath + '/js/controllers/HomeCtrl.js',
                applicationPath + '/js/controllers/GameCtrl.js',
                applicationPath + '/js/controllers/RankingCtrl.js',
            ],
            vendorCSS: [
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
                'node_modules/angular-bootstrap-colorpicker/css/colorpicker.min.css'
            ],
            defaultCSS: [
                applicationPath + '/css/directives/loading.css',
                applicationPath + '/css/utils/component/button.css',
                applicationPath + '/css/utils/component/text.css',
                applicationPath + '/css/utils/component/color.css',
                applicationPath + '/css/utils/component/helpers.css',
                applicationPath + '/css/utils/component/defaults.css',
                applicationPath + '/css/custom.css',
            ],
            defaultFonts: [
                'node_modules/bootstrap/dist/fonts/*'
            ],
            defaultImg: [
                applicationPath + '/images/*'
            ]
        },
        buildPath = null,
        buildType = null;

    gulp.task('uglify', ['jshint'], function () {
        return gulp
            .src(files.vendorJS.concat(files.defaultJS))
            .pipe(replace('{{endpoint.domain}}', endpoint.domain.dist))
            .pipe(concat('App.js'))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min',
                ie8: true
            }))
            .pipe(gulp.dest(buildPath + '/js'));
    });

    gulp.task('cleanCSS', [], function () {
        return gulp
            .src(files.vendorCSS.concat(files.defaultCSS))
            .pipe(concat('App.css'))
            .pipe(cleanCSS({
                specialComments: 0
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(buildPath + '/css'));
    });

    gulp.task('concatCss', [], function () {
        return gulp
            .src(files.vendorCSS.concat(files.defaultCSS))
            .pipe(concat('App.css'))
            .pipe(gulp.dest(buildPath + '/css'));
    });

    gulp.task('jshint', function () {
        return gulp
            .src(files.defaultJS)
            .pipe(jshint())
            .pipe(jshint.reporter());
    });

    gulp.task('fileInclude', function () {
        return gulp
            .src([applicationPath + '/**/*.html', '!app/includes/**'])
            .pipe(fileInclude({
                prefix: '@@',
                basepath: applicationPath + '/includes/'
            }))
            .pipe(gulp.dest(buildPath));
    });

    gulp.task('htmlbuild', ['fileInclude'], function () {
        var contextPath = (buildPath === 'preview') ? contextLocal : contextDist;
        
        return gulp
            .src(buildPath + '/*.html')
            .pipe(replace('<base href="/">', function () {
                    return '<base href="' + contextPath + '">'
                }
            ))
            .pipe(htmlBuild({
                js: htmlBuild.preprocess.js(function (block) {
                    block.write(contextDist + 'js/App.min.js');
                    block.end();
                }),
                css: htmlBuild.preprocess.css(function (block) {
                    block.write(contextDist + 'css/App.min.css');
                    block.end();
                }),
                remove: function (block) {
                    block.end();
                }
            }))
            .pipe(gulp.dest(buildPath + '/'));
    });

    gulp.task('htmlmin', ['htmlbuild'], function () {
        return gulp
            .src([buildPath + '/**/*.html'])
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(buildPath));
    });

    gulp.task('copyFonts', function () {
        return gulp
            .src(files.defaultFonts)
            .pipe(copy(buildPath + '/fonts', {prefix: 4}));
    });
 
    gulp.task('copyImages', function () {
        return gulp
            .src(files.defaultImg)
            .pipe(gulp.dest(buildPath + '/images'));
    });

    gulp.task('zip', function () {
        return gulp.src(distPath + '/**/*')
            .pipe(zip('dist.zip'))
            .pipe(gulp.dest('./'));
    });

    gulp.task('concatJs', ['jshint'], function () {
        return gulp
            .src(files.vendorJS.concat(files.defaultJS))
            .pipe(replace('{{endpoint.domain}}', endpoint.domain.integrated))
            .pipe(concat('App.js'))
            .pipe(gulp.dest(buildPath + '/js'));
    });

    gulp.task('watch', function () {
        var concatType = 'concatJs';

        gulp.watch(applicationPath + '/**/*.html', ['fileInclude']);
        gulp.watch(applicationPath + '/js/**/*.js', ['jshint', concatType]);
        gulp.watch(applicationPath + '/css/**/*.css', ['concatCss']);
    });

    gulp.task('server', function () {
        var server = liveServer.static(['preview']);
        var concatType = 'concatJs';

        buildPath = 'preview';

        server.start();
        gulp.start('copyFonts', 'copyImages', 'concatCss', 'jshint', concatType, 'fileInclude');

        gulp.watch('preview/**/*.html', function (file) {
            server.notify.apply(server, [file]);
        });

        gulp.watch('preview/js/**/*.js', function (file) {
            server.notify.apply(server, [file]);
        });

        gulp.watch('preview/css/**/*.css', function (file) {
            server.notify.apply(server, [file]);
        });
    });

    gulp.task('default', function () {
        buildType = 'default';
        gulp.start('server', 'watch');
    });

    gulp.task('integrated', function () {
        buildType = 'integrated';
        gulp.start('server', 'watch');
    });

    gulp.task('dist', function () {
        buildPath = distPath;
        gulp.start(
            'jshint',
            'uglify',
            'cleanCSS',
            'copyFonts',
            'copyImages',
            'fileInclude',
            'htmlbuild',
            'htmlmin'
        );
    });

}());