/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

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
		}
		
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask( 'build', [ 'default'] );

		// Default task.
	grunt.registerTask( 'default', [
		
		'sass'
		
	]);

	// aliases
	grunt.registerTask( 'server', 'connect:server' );
	grunt.registerTask( 'sanitycheck', 'connect:sanitycheck' );

};
