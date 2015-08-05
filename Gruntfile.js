module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
   less: {
      development: {
        options: {
          compress: false,
          yuicompress: false
        },
        files: {
          "styles/app.css": "less/app.less" // destination file and source file
        }
      },
      production: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "styles/app.min.css": "less/app.less" // destination file and source file
        }
      }
    },
    uglify: {
      development: {
        files: {
          'scripts/utilities.min.js': ['scripts/utilities.js'],
          'scripts/customAlert.min.js': ['scripts/customAlert.js'],
          'scripts/log.min.js': ['scripts/log.js'],
          'scripts/log-performance.min.js': ['scripts/log-performance.js']
        }
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('default', ['uglify', 'less', 'watch']);
  grunt.registerTask('shrink-js', ['uglify']);
};