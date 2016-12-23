// Gruntfile for Udacity Portfolio
// Grey Grissom 21 Dec 2016
module.exports = function(grunt) {


	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		autoprefixer: {
			dist: {
				files: {
					'css/main_built.css': 'raw/styles/main.css'
				}
			}
			},
		concat:  {
			//2. Configuration for concatenating javascript files
			options: {
				// Replace all use strict lines with one at top
				banner: "'use strict';\n",
				process: function(src, filepath) {
					return '// Source: ' + filepath + '\n' +
					src.replace(/(^|\n)[\t]*('use strict'|"use strict");?\s*/g, '$1');
				},
			},
			dist: {
				src: [
					'vendor/scripts/*.js', // All 3rd party jS libraries
					'raw/scripts/*.js' // custom utility js file
				],
				dest: 'raw/scripts/build/production.js',
			}
		},

		uglify: {
			build: {
				src: 'raw/scripts/build/production.js',
				dest: 'js/production.min.js'
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/build/'
					}]
			}
		},

		watch: {

			options: {
				livereload: true,
				},
			styles: {
				files: ['raw/styles/main.css', 'raw/styles/*.scss'],
				tasks: ['autoprefixer', 'sass'],
				options: {
					spawn: false
				}
			},

			scripts: {
				files: ['raw/scripts/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					spawn: false,
				},
			}
		},

		jshint: {
			files: ['raw/scripts/*.js']
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/main_built.css' : 'raw/styles/*.scss'
				}
			}
		}


		});

	// 3. Deployment of #2
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-menu');


	grunt.registerTask('js', ['grunt-contrib-jshint', 'grunt-contrib-concat', 'grunt-contrib-uglify']);
	//4. The Default "Grunt"
	grunt.registerTask('default', ['autoprefixer', 'jshint', 'concat', 'uglify', 'imagemin']);
};




