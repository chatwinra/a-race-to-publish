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
		},
		
		  	fetch: {
   				 options: {
				      //file format depends on size: process: require( 'csv-to-json' )
				    },
				    table1: {
				      url: 'https://docs.google.com/a/guardian.co.uk/spreadsheet/ccc?key=123456#gid=0',
				      dest: 'project/data/table1.json'
				    },
				    table2: {
				      url: 'https://docs.google.com/a/guardian.co.uk/spreadsheet/ccc?key=234567#gid=0',
				      dest: 'project/data/table2.json'
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
