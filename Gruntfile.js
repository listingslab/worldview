module.exports = function(grunt) {
  
	grunt.initConfig({

		// JS TASKS ================================================================

		// check all js files for errors
	    jshint: {
	      all: ['src/js/**/*.js', 'src/js/*.js', 'app/**/*.js', 'server.js', 'config/js/*.js'] 
	    },

	    // take all the js files and minify them into app.min.js
	    uglify: {
	      build: {
	        files: {
	          'public/js/worldview_angular.min.js': ['src/angular/**/*.js', 'src/angular/*.js']
	        }
	      }
	    },

	    // CSS TASKS ===============================================================
	    // process the less file to style.css
	    less: {
	      build: {
	        files: {
	          'public/css/style.css': 'src/css/style.less'
	        }
	      }
	    },

	    // take the processed style.css file and minify
	    cssmin: {
	      build: {
	        files: {
	          'public/css/style.min.css': 'public/css/style.css'
	        }
	      }
	    },

	    // COOL TASKS ==============================================================
	    // watch css and js files and process the above tasks
	    watch: {
	      css: {
	        files: ['src/css/**/*.less'],
	        tasks: ['less', 'cssmin']
	      },
	      js: {
	        files: ['src/js/**/*.js'],
	        tasks: ['jshint', 'uglify']
	      }
	    },

		// configure nodemon
	    nodemon: {
	      dev: {
	        script: 'server/app.js'
	      }
	    },


	    // run watch and nodemon at the same time
	    concurrent: {
	      options: {
	        logConcurrentOutput: true
	      },
	      tasks: ['nodemon', 'watch']
	    }  
	    
	});

	// load NpmTasks
  	grunt.loadNpmTasks('grunt-nodemon');
  	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-less');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-concurrent');

  	// register the nodemon task when we run grunt
  	grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']); 

};