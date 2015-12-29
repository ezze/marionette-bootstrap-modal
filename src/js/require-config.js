define({
    baseUrl: './src/js',
    map: {
        '*': {
            'underscore': 'lodash'          // replacing Underscore with Lo-Dash
        }
    },
    paths: {
        'backbone': '../../lib/backbone/backbone',
        'bootstrap': '../../lib/bootstrap/dist/js/bootstrap',
        'jquery': '../../lib/jquery/dist/jquery',
        'hgn': '../../lib/requirejs-hogan-plugin/hgn',
        'hogan': '../../lib/requirejs-hogan-plugin/hogan',
        'i18n': '../../lib/require-i18next/require-i18next/i18next',
        'i18next': '../../lib/i18next/i18next.amd.withJQuery',
        'i18next-builder': '../../lib/require-i18next/require-i18next/i18next-builder',
        'lodash': '../../lib/lodash/lodash',
        'marionette': '../../lib/backbone.marionette/lib/backbone.marionette',
        'mustache': '../../lib/mustache.js/mustache',
        'text': '../../lib/text/text',
        'underscore': '../../lib/underscore/underscore'
    },
    shim: {
        'bootstrap': {
            deps: [
                'jquery'
            ],
            exports: '$'
        },
        'marionette': {
            deps: [
                'jquery',
                'underscore',
                'backbone'
            ],
            exports: 'Marionette'
        }
    },
    i18next: {
        ns: 'translation',
        detectLngQS: 'language',
        fallbackLng: 'ru',
        lowerCaseLng: true,
        resGetPath: '__lng__.__ns__.json',
        cookieName: 'language',
        useCookie: true,
        detectLngFromLocalStorage: false,
        supportedLngs: {
            en: ['translation'],
            ru: ['translation']
        },
        useDataAttrOptions: true
    }
});