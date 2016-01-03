/* global module: false */
module.exports = function(grunt) {
    'use strict';

    return {
        font: {
            files: [{
                expand: true,
                cwd: 'src/font',
                src: [
                    '**'
                ],
                dest: 'assets/font'
            }]
        },
        image: {
            files: [{
                expand: true,
                cwd: 'src/img',
                src: [
                    '**'
                ],
                dest: 'assets/img'
            }]
        }
    };
};