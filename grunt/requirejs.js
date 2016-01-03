/* global module: false */
module.exports = function(grunt) {
    // Retrieving RequireJS config to use with r.js optimizer
    var configString = grunt.file.read('src/js/require-config.js'),
        configMatch = configString.match(/define\((\{[\s\S]*\})\);/i);
    if (configMatch === null) {
        throw new Error('Unable to retrieve RequireJS config object.');
    }
    configString = configMatch[1];

    var config;
    /* jshint ignore:start */
    config = eval('(' + configString + ')');
    /* jshint ignore:end */

    // https://github.com/jcbvm/require-i18next#inlining-locales
    config.shim.almond = ['i18next'];

    return {
        options: {
            almond: true,
            baseUrl: './src/js',
            include: [
                'modal-manager'
            ],
            preserveLicenseComments: false,
            findNestedDependencies: true,
            map: config.map,
            paths: config.paths,
            shim: config.shim,
            i18next: config.i18next,
            inlineI18next: true,
            stubModules: [
                'hgn',
                'text'
            ],
            wrap: {
                startFile: 'src/wrap/start.frag',
                endFile: 'src/wrap/end.frag'
            }
        },
        development: {
            options: {
                out: 'dist/modal-manager.js',
                generateSourceMaps: false,
                optimize: 'none'
            }
        },
        production: {
            options: {
                out: 'dist/modal-manager.js',
                generateSourceMaps: true,
                optimize: 'uglify2'
            }
        }
    };
};