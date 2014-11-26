/* Gruntfile.js
 */

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
         * Mocha Unit Tests & Blanket Coverage 
         */ 
        blanket_mocha: {
            all: ["test/test_runner.html"],
            options: {
                threshold: 90,
                run: false
            }
        },


        watch: {
            scripts: {
                files: [
                    './src/goatstone/**/*.css',
                    '<%= jshint.files %>'
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                    event: ['all'],
                    livereload: true
                }
            }
        },
        concat: {
            options: {
                separator: ' '
            },
            loadfirst: {
                src: ['src/goatstone/ui/component/Component.js' ],
                dest: 'public/js/component.js'
            },
            dist: {
                src: ['src/goatstone/**/*.js', '!src/goatstone/ui/component/Component.js' ],
                dest: 'public/js/<%= pkg.name %>.js'
            },
            vendor: {
                src: ['src/vendor/**/*.js'],
                dest: 'public/js/vendor.js'
            },
            css: {
                src: [
                    'src/goatstone/alphacronke/style/*.css',
                    'src/goatstone/ui/style/*.css'
                ],
                dest: 'public/css/<%= pkg.name %>.all.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/goatstone/**/*.js'],
            options: {
                //  options here to override JSHint defaults
                "-W030": true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-blanket-mocha");

    // Default task(s).
    // grunt.registerTask('default', ['jshint', 'watch', 'concat', 'uglify']);
    grunt.registerTask("tests", ["blanket_mocha"]);

    // grunt.registerTask("default", ["tests"]);
//    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('default', ['jshint', 'concat' ]);

};