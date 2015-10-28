module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist', '.tmp'],

        copy: {
            main: {
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', 'favicon.icon', 'img/**', '!js/**', '!css/**', '!scss/**', 'img/**'],
                dest: 'dist/'
            },
            fonts: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                cwd: 'app',
                src: ['bootstrap/fonts/**', 'font-awesome/fonts/**'],
                dest: 'dist/fonts/'
            },
            assets: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                cwd: 'app',
                src: ['rs-plugin/assets/**'],
                dest: 'dist/assets/'
            },
            html: {
                expand: true,
                cwd: '.tmp',
                src: ['**/*.html'],
                dest: 'dist/'
            }
        },

        useminPrepare: {
            html: {
                src: ['app/*.html']
            },
            options: {
                dest: 'dist'
            }
        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },

        filerev: {
            files: {
                src: ['dist/**/*.{js,css}']
            }
        },

        usemin: {
            html: {
                src: ['dist/*.html']
            },
            options: {
                assetDirs: ['dist', 'dist/css', 'dist/js', 'css', 'js']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '**/*.html',
                    dest: '.tmp/'
                }]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('build', [
        'clean',
        'copy:main',
        'copy:fonts',
        'copy:assets',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'filerev',
        'usemin',
        'htmlmin',
        'copy:html'
    ]);

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', ['build']);
};
