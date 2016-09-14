module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	var staticFiles = [ 'src/**/*.html', 'src/styles/**/*.css', 'src/styles/fonts/*', 'src/images/**/*.png' ];

	require('grunt-dojo2').initConfig(grunt, {
		copy: {
			staticFiles: {
				expand: true,
				cwd: '.',
				src: staticFiles,
				dest: '<%= devDirectory %>'
			}
		},
		stylus: {
			dev: {
				options: {},
				files: [ {
					expand: false,
					src: 'src/styles/stylus/app.styl',
					ext: '.css',
					dest: '_build/src/styles/css/app.css'
				} ]
			}
		},
		watch: {
			stylus: {
				files: ['src/styles/stylus/*.styl'],
				tasks: ['stylus:compile'],   // This needs to be "tasks" (not "task")
				options : { livereload: true },
			}
		}
	});

	grunt.registerTask('dev', grunt.config.get('devTasks').concat(['copy:staticFiles', 'stylus:dev']));

	grunt.registerTask('ci', [
		'intern:node',
		'intern:saucelabs'
	]);
};
