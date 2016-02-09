/* global module: false */
module.exports = function(grunt) {
    'use strict';

    return {
        options: {
            binderName: 'amd'
        },
        modal: {
            src: 'src/js/templates/modal.mustache',
            dest: 'src/js/templates/modal.js'
        },
        'modal-text': {
            src: 'src/js/templates/modal-text.mustache',
            dest: 'src/js/templates/modal-text.js'
        }
    };
};