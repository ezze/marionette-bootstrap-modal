# Marionette Bootstrap Modal Manager

[Bootstrap 3](http://getbootstrap.com/) modal windows support for [Backbone Marionette](http://marionettejs.com/) library.

## Building

1. Install [Node.js](https://nodejs.org/) and [NPM](http://npmjs.com/):

    - Ubuntu:

        sudo apt-get install nodejs npm

2. Install [Grunt.js command line interface](http://gruntjs.com/) globally:

        npm install -g grunt-cli

3. Install [Bower](http://bower.io/) globally:

        npm install -g bower

4. Install development packages from repository's root directory:

        npm install

5. Install web libraries from repository's root directory:

        bower install

6. Build the project:

        grunt
        
## Usage

### Standalone version

Include `dist/modal-manager.min.js` script with [Bootstrap](http://getbootstrap.com)'s CSS file and use it as follows:

    var modalManager = new ModalManager({
        container: 'body'       // container for holding modal windows
    });
    
    modalManager.show({
        title: 'Marionette view',
        view: new Marionette.ItemView({
            template: function(params) { return '<p>Hello, ' + params.value + '!</p>'; },
            model: new Backbone.Model({
                value: 'world'
            })
        })
    });

It also can be used as AMD module in Require.js application but it's not preferred way. One should configure
Require.js as described in the next section.     

### Require.js version

The library depends on [Underscore.js](http://underscorejs.org/), [jQuery](https://jquery.com/),
[Bootstrap](http://getbootstrap.com), [Backbone.js](http://backbonejs.org/), [Marionette.js](http://marionettejs.com/),
[Hogan.js](http://twitter.github.io/hogan.js/) and (optionally) [i18next](http://i18next.com/).

Therefore [Require.js](http://requirejs.org/) configuration should look like this (considered that
[requirejs-hogan-plugin](https://github.com/millermedeiros/requirejs-hogan-plugin) and
[require-i18next](https://github.com/jcbvm/require-i18next) are used): 

    paths: {
        'backbone': 'lib/backbone/backbone',
        'bootstrap': 'lib/bootstrap/dist/js/bootstrap',
        'jquery': 'lib/jquery/dist/jquery',
        'hogan': 'lib/requirejs-hogan-plugin/hogan',
        'i18n': 'lib/require-i18next/require-i18next/i18next',
        'i18next': 'lib/i18next/i18next.amd.withJQuery',
        'i18next-builder': 'lib/require-i18next/require-i18next/i18next-builder',
        'marionette': 'lib/backbone.marionette/lib/backbone.marionette',
        'text': 'lib/text/text',
        'underscore': 'lib/underscore/underscore'
    },
    packages: [{
        name: 'modal-manager',
        location: 'lib/marionette-bootstrap-modal-manager/src/js',
        main: 'modal-manager'
    }]
    
Use modal manager in your AMD module:

    define(function([
        'backbone',
        'marionette',
        'modal-manager'
    ], function(
        Backbone,
        Marionette,
        ModalManager
    ) {
        'use strict';
        
        var modalManager = new ModalManager({
            container: 'body'
        });
        
        modalManager.show({
            title: 'Marionette view',
            view: new Marionette.ItemView({
                template: function(params) { return '<p>Hello, ' + params.value + '!</p>'; },
                model: new Backbone.Model({
                    value: 'world'
                })
            })
        });
    });
        
## Events

Modal manager's `show` and `hide` methods return [jQuery Deferred Object](https://api.jquery.com/category/deferred-object/)
that's why it's possible to handle show and hide events:

    var def = modalManager.show({...});
    def.done(function() {
        // Modal window is shown
    });
    
    def = modalManager.hide();
    def.done(function() {
        // Modal window is hidden
    });
    
## Buttons

By default, each modal window has only single close button with default `Close` caption that can be changed by
setting `closeButtonCaption` option:

    modalManager.show({
        ...
        closeButtonCaption: 'Закрыть'
    });
    
Close button can be hidden to prevent a user to close a modal window:

    modalManager.show({
        ...
        closeButton: false
    });
    
Additional buttons with custom handlers can be added by setting `buttons` option:

    modalManager.show({
        view: new Marionette.ItemView(...),
        buttons: [{
            id: 'yes',
            caption: 'Yes',
            handler: function(view, id) {
                // this refers to active ModalView instance,
                // view refers to modal window's body view (passed as view option to show method),
                // id is button's identifier
                
                var def = this.hide();      // closing modal window     
                def.always(function() {
                    // Do something on modal window close
                });
            }
        }, {
            id: 'no',
            caption: 'No',
            handler: function(view, id) {
                ...
            }
        }]
    });
    
## Internationalization

Modal manager can be used with [i18next](http://i18next.com/):

    var app = new Marionette.Application();
    
    ...

    var modalManager = new ModalManager({
        container: 'body',
        i18nEventObject: app,
        i18nEventName: 'language'       // optional, defaults to 'language' 
    });
    
    modalManager.show({
        ...
        titleI18n: 'modal-title',                   // value of data-i18n attribute for modal's title
        closeButtonCaptionI18n: 'modal-close-text', // value of data-i18n attribute for modal's close button
        buttons: [{
            id: 'yes',
            captionI18n: 'button-yes',              // value of data-i18n attribute for button
            ...
        }, {
            ...
        }]
    });
    
Each time event `i18nEventName` is triggered on `i18nEventObject` current active modal view will be translated
by calling its `this.$el.i18n()`.

## Contribution

Before making a pull request, please, be sure that your changes are rebased to `dev` branch.