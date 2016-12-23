// Gruntfile for Udacity Portfolio
// Grey Grissom 21 Dec 2016


var javascriptLibraries = [];
var cssLibraries = [];




module.exports = function(grunt) {


	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

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
					'js/libs/*.js', // All 3rd party jS libraries
					'js/global.js' // custom utility js file
				],
				dest: 'js/build/production.js',
			}
		},

		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
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

			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},

			css: {
				files: ['css/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/build/global.css' : 'css/global.scss'
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


	//4. The Default "Grunt"
	grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
};