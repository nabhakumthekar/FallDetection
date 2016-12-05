module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist', '.tmp'],

        copy: {
            html: {
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', 'favicon.ico'],
                dest: 'dist/'
            },
            fonts: {
                expand: true,
                cwd: 'app/assets/fonts',
                src: ['**'],
                dest: 'dist/assets/fonts/'
            },
            plugins: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                cwd: 'app',
                src: [
                    'assets/plugins/bootstrap/fonts/**',
                    'assets/plugins/font-awesome/fonts/**'
                ],
                dest: 'dist/assets/fonts/'
            },
            images: {
                expand: true,
                cwd: 'app',
                src: ['assets/images/**'],
                dest: 'dist/'
            },
            htmlmin: {
                expand: true,
                cwd: '.tmp',
                src: ['**/*.html'],
                dest: 'dist/'
            }
        },

        stylelint: {
            options: {
                configFile: 'check/stylelint.json',
                format: 'scss'
            },
            target: [
                'app/assets/css/*.css'
            ]
        },

        eslint: {
            development: {
                options: {
                    configFile: 'check/eslint.json'
                },
                src: [
                    'Gruntfile.js',
                    'app/assets/js/*.js'
                ]
            },
            build: {
                options: {
                    configFile: 'check/eslint-build.json'
                },
                src: [
                    'Gruntfile.js',
                    'app/assets/js/*.js'
                ]
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
                src: ['dist/assets/**/*.{js,css}']
            }
        },

        usemin: {
            html: {
                src: ['dist/*.html']
            },
            options: {
                assetDirs: ['dist', 'dist/assets/css', 'dist/assets/js']
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

    grunt.registerTask('build', [
        'clean',
        'copy:html',
        'copy:fonts',
        'copy:plugins',
        'copy:images',
        'stylelint',
        'eslint:build',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'filerev',
        'usemin',
        'htmlmin',
        'copy:htmlmin'
    ]);

    grunt.registerTask('check', [
        'stylelint',
        'eslint:development'
    ]);

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', ['build']);
};
