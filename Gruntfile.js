/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		prod: false,
		min: false,

		copy: {
			src: {
				files: [{
					expand: true,
					cwd: 'project/src',
					src: ['**'],
					dest: 'build/'
				}]
			},
			assets: {
				files: [{
					expand: true,
					cwd: 'project/assets',
					src: ['**'],
					dest: 'build/assets/'
				}]
			}
		},

		// Main watch task. Kick this off by entering `grunt watch`. Now, any time you change the files below,
		// the relevant tasks will execute
		watch: {
			options: {
				interrupt: true
			},
			src: {
				files: 'project/src/**/*',
				tasks: 'copy:src'
			},
			assets: {
				files: 'project/assets/**/*',
				tasks: 'copy:assets'
			},
			sass: {
				files: 'project/styles/*.scss',
				tasks: 'sass'
			}
		},
			// Compile .scss files
		sass: {
			main: {
				files: [{
					src: 'Project/styles/main.scss',
					dest: 'build/min.css'
				}],
				options: {
					debugInfo: '<%= prod ? false : true %>',
					style: ( '<%= min ? "compressed" : "expanded" %>' )
				}
			}
		},

		clean: {
			build: 'build/'
		},

		fetch: {
			csv: {
				url: 'https://docs.google.com/spreadsheet/pub?key=0Amx0ykTxmI2KdEd1cTNNSUZaRUhXcVluLTJ4TmFpbnc&output=csv',
				dest: 'Project/src/data.csv'
			}
		}

	});




	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	grunt.loadNpmTasks( 'grunt-fetch' );

	grunt.registerTask( 'build', [
		'clean:build',
		'copy:src',
		'copy:assets',
		'sass'
	]);

		// Default task.
	grunt.registerTask( 'default', [
		'build', 
		'watch'
	]);

};