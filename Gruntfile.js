/* Gruntfile.js
*/

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['./css/*.css', '<%= jshint.files %>'],
        tasks: ['default'],
        options: {
          spawn:false,
          event:['all'],
          livereload: true 
        },
      },
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/goatstone/**/*.js'  ],
        dest: 'public/js/<%= pkg.name %>.js'
      },
      css: {
        src: ['src/goatstone/style/*.css'  ],
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
        // options here to override JSHint defaults
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

  // Default task(s).
  //  grunt.registerTask('default', ['jshint', 'watch', 'concat', 'uglify']);
  grunt.registerTask('default', ['jshint',   'concat', 'uglify']);

};