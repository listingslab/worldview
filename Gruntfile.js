module.exports = function(grunt) {
  
	grunt.initConfig({

		// JS TASKS ================================================================

		// lint all angular js files
	    jshint: {
	      all: ['src/angular/**/*.js', 'src/angular/*.js', 'server/**/*.js', 'server/app.js', 'server/config/*.js'] 
	    },

	    // concatonate all the angular files into one
	    concat: {  
		    js: {
		        src: [
		       		'src/angular/app.js',
		            'src/angular/controllers/**.js'  
		        ],
		        dest: 'public/js/app.concat.js'
		    },
		    libs: {
		        src: [
		       		'public/libs/jquery/dist/jquery.min.js',
		       		'public/libs/bootstrap/dist/js/bootstrap.min.js',
		       		'public/libs/angular/angular.min.js',
		       		'public/js/app.min.js'
		        ],
		        // concatonate everything into one JS file
		        dest: 'public/js/worldview.concat.js'
		    }
		},

	    // Minify them into worldviewApp.min.js
	    uglify: {
	      build: {
	      	options: {
		     	// Don't mangle the strings because it breaks Angular
			  	mangle: false
			},
	        files: {
	          'public/js/app.min.js': ['public/js/app.concat.js']
	        }
	      }
	    },


	    // CSS TASKS ===============================================================
	    // process the less file to main.css
	    less: {
	      build: {
	        files: {
	          'public/css/main.css': 'src/css/main.less'
	        }
	      }
	    },

	    // take the processed main.css file and minify
	    cssmin: {
	      build: {
	        files: {
	          'public/css/main.min.css': 'public/css/main.css'
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
	        files: ['src/angular/*.js', 'src/angular/**/*.js', 'Gruntfile.js'],
	        tasks: ['jshint', 'concat', 'uglify']
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
  	grunt.loadNpmTasks('grunt-contrib-concat');

  	// register the nodemon task when we run grunt
  	grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'concat', 'concurrent']); 

};