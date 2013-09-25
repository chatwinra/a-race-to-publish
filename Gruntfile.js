/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
			'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		copy: {
			build: {
				src: 'src/CSVParser.js',
				dest: 'build/CSVParser.js',
				options: {
					processContent: function ( content ) {
						return content.replace( '<%= version %>', grunt.template.process( '<%= pkg.version %>' ) );
					}
				}
			},
			release: {
				files: [{
					cwd: 'build/',
					src: [ '**' ],
					expand: true,
					dest: 'release/<%= pkg.version %>/'
				}]
			},
			shortcut: {
				files: [{
					cwd: 'build/',
					src: [ '**' ],
					expand: true,
					dest: ''
				}]
			},
		
		// Copy the files we need from the src folder to appfog/public
		
			generated: {
				files: [{
					expand: true,
					cwd: 'project/styles',
					src: ['**'],
					dest: 'generated'
				}]
			},
			root: {
				files: [{
					expand: true,
					cwd: 'project/styles',
					src: ['**'],
					dest: 'appfog/public'
				}]
			}
		},

		concat: {
			options: {
				process: {
					data: { version: '<%= pkg.version %>' }
				}
			},
			legacy: {
				src: [ 'src/CSVParser.js', 'src/json2.js' ],
				dest: 'build/CSVParser-legacy.js'
			}
		},

		uglify: {
			main: {
				src: 'build/CSVParser.js',
				dest: 'build/CSVParser.min.js'
			},
			min: {
				src: 'build/CSVParser-legacy.js',
				dest: 'build/CSVParser-legacy.min.js'
			}
		},

		qunit: {
			main: 'test/index.html'
		},
	

		// Main watch task. Kick this off by entering `grunt watch`. Now, any time you change the files below,
		// the relevant tasks will execute
		watch: {
			sass: {
				files: 'project/styles/*.scss',
				tasks: 'sass',
				interrupt: true
			}
		},
			// Compile .scss files
		sass: {
			options: {
				style: 'compressed'
				},	
			
			dev: {
				files: {
					'generated/min.css': 'project/styles/*.scss'
				},
				options: {
					debugInfo: true
				}
			},
			dist: {
				files: {
					'appfog/public/min.css': 'project/styles/*.scss'
				}
			}
		},

});
		

						

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );

	grunt.registerTask( 'build', [ 'default','copy:build', 'concat', 'uglify'] );

		// Default task.
	grunt.registerTask( 'default', [
		
		'sass',
		'copy',
		'concat', 
		'uglify'
	
		
	]);

	// aliases
	grunt.registerTask( 'server', 'connect:server' );
	grunt.registerTask( 'sanitycheck', 'connect:sanitycheck' );

};
