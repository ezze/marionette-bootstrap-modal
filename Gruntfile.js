/* global module: false, process: false */
module.exports = function(grunt) {
    var path = require('path');

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        init: true,
        data: {
            pkg: grunt.file.readJSON('package.json')
        }
    });

    grunt.registerTask('run', [
        'connect:server'
    ]);

    grunt.registerTask('js', [
        'hogan',
        'jshint',
        'requirejs:development',
        'uglify:production'
    ]);

    grunt.registerTask('build', [
        'js'
    ]);

    grunt.registerTask('rebuild', [
        'clean',
        'build'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};