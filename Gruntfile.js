module.exports = function(grunt) {
  
	grunt.initConfig({

		// JS TASKS ================================================================

		// lint all angular js files
	    jshint: {
	      all: ['src/angular/**/*.js', 'src/angular/*.js', 'server/**/*.js', 'server/app.js', 'server/config/*.js'] 
	    },

	    // concatonate all the angular files into one
	    concat: {  
		    angular: {
		        src: [
		       		'src/angular/app.js',
		            'src/angular/controllers/**.js'  
		        ],
		        dest: 'src/build/app.concat.js'
		    },
		    everything: {
		        src: [
		       		'src/build/listingslab.js',
		       		'bower_components/jquery/dist/jquery.min.js',
		       		'bower_components/bootstrap/dist/js/bootstrap.min.js',
		       		'bower_components/angular/angular.min.js',
		       		'src/build/app.concat.min.js'
		        ],
		        // concatonate EVERYTHING into one JS file
		        dest: 'public/js/worldview.concat.min.js'
		    },
		    css: {
		        src: [
		        	'bower_components/bootstrap/dist/css/bootstrap.min.css',
		        	'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
		       		'src/build/css/main.min.css'
		        ],
		        // concatonate EVERYTHING into one CSS file
		        dest: 'public/css/worldview.concat.min.css'
		    }
		},

	    // Minify the concatonated Angular file
	    uglify: {
	      build: {
	      	options: {
		     	// Don't mangle the strings because it breaks Angular
			  	mangle: false
			},
	        files: {
	          'src/build/app.concat.min.js': ['src/build/app.concat.js']
	        }
	      }
	    },


	    // CSS TASKS ===============================================================
	    // process the less file to main.css
	    less: {
	      build: {
	        files: {
	          'src/build/css/main.css': 'src/css/main.less'
	        }
	      }
	    },

	    // take the processed main.css file and minify
	    cssmin: {
	      build: {
	        files: {
	          'src/build/css/main.min.css': 'src/build/css/main.css'
	        }
	      }
	    },

	    // COOL TASKS ==============================================================
	    // watch css and js files and process the above tasks
	    watch: {
	      css: {
	        files: ['src/css/**/*.less'],
	        tasks: ['less', 'cssmin', 'concat:css']
	      },
	      js: {
	        files: [
	        	'Gruntfile.js', 
	        	'src/build/listingslab.js',
	        	'src/angular/*.js', 
	        	'src/angular/**/*.js'
	        ],
	        tasks: ['jshint', 'concat:angular', 'uglify', 'concat:everything']
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