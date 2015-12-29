/* global module: false */
module.exports = function(grunt) {
    'use strict';

    return {
        production: {
            options: {
                sourceMap: false
            },
            files: {
                'dist/modal-manager.min.js': 'dist/modal-manager.js'
            }
        }
    };
};