// 包装函数
module.exports = function(grunt) {

	// 任务配置
	grunt.initConfig({
		pkg : grunt.file.readJSON("package.json"),
		uglify : {
			options : {
				mangle : true,
				banner : "/** \n"
						+ " * -------------------------------------------------------------\n"
						+ " * @version: <%= pkg.version%> \n"
						+ " * @description: <%= pkg.description%> \n"
						+ " * ------------------------------------------------------------- \n"
						+ " */ \n\n"
			},
			demo: {
				files : [{
					expand: true,
                    cwd: "js/dev/module",
                    src: ["**/*.js"],
                    dest: "js/pro/module"
				}, {
					expand: true,
                    cwd: "js/dev/controller",
                    src: ["**/*.js"],
                    dest: "js/pro/controller"
				}]
			}
		},
		copy: {
			demo : {
				expand: true,
                cwd: "js/dev/lib",
                src: ["**/*.js"],
                dest: "js/pro/lib"
			}
		}
	});

	// 任务加载
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	
	// 自定义任务
	grunt.registerTask("default", [ "uglify", "copy" ]);

};