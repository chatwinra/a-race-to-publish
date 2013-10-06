/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		prod: false,
		min: false,

		copy: {
			generated: {
				files: [{
					expand: true,
					cwd: 'project/styles',
					src: ['**'],
					dest: 'generated'
				}]
			},
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
			main: {
				files: [{
					src: 'Project/styles/main.scss',
					dest: 'generated/min.css'
				}],
				options: {
					debugInfo: '<%= prod ? false : true %>',
					style: ( '<%= min ? "compressed" : "expanded" %>' )
				}
			}
		},

		clean: {
			generated: 'generated/'
		},

		fetch: {
			csv: {
				url: 'https://docs.google.com/spreadsheet/pub?key=0Amx0ykTxmI2KdEd1cTNNSUZaRUhXcVluLTJ4TmFpbnc&output=csv',
				dest: 'Project/content/data.csv'
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

	grunt.registerTask( 'build', [ 'default','copy:build', 'concat', 'uglify'] );

		// Default task.
	grunt.registerTask( 'default', [
		'sass',
		'copy',
		'concat', 
		'uglify'
	]);

};