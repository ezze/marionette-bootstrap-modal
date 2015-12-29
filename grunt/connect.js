/* global module: false */
module.exports = function(grunt) {
    'use strict';

    return {
        options: {
            port: 8888,
            useAvailablePort: true,
            keepalive: true
        },
        server: {
            options: {
                base: '.'
            }
        }
    };
};