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

    define([
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
    
### Options

Here is a full list of properties that can be passed to `ModalManager.show()` method:

- `title` — modal window's title (empty by default);
- `titleI18n` — value of `data-i18n` attribute used to translate modal window's title with `i18next` (empty by default);
- `view` — instance of Marionette view to use as modal window's body;
- `closeButton` — whether modal window has close button and can be closed by a user (defaults to `true`);
- `closeButtonCaption` — caption of close button (defaults to `Close`);
- `closeButtonCaptionI18n` — value of `data-i18n` attribute used to translate close button's caption with `i18next`
(defaults to `modal.close`);
- `closeButtonStyle` — Bootstrap type of close button, possible values are `default` (default), `primary`, `success`,
`info`, `warning`, `danger`, `link`,
- `closeHandler` — a function to execute when modal window is closed (`this` refers to active `ModalView` instance,
and modal window's body `view` is passed as an argument);
- `beforeCloseHandler` — a function to execute just before closing modal window (`this` refers to active `ModalView`
instance, and modal window's body `view` is passed as an argument); if the function returns `false` then modal window
will be prevented from being closed;
- `buttons` — array of objects where each object describes modal window's additional button and consists of the
following properties:
    - `id` — button's string identifier;
    - `caption` — button's caption (empty by default);
    - `captionI18n` — value of `data-i18n` attribute used to translate button's caption width `i18next`
    (empty by default);
    - `style` — Bootstrap type of button, the same as `closeButtonStyle` (defaults to `default`);
    - `disabled` — shows whether button is disabled (defaults to `false`);
    - `handler` — a function to execute on button click (`this` refers to active `ModalView` instance, and modal
    window's body `view` and button's `id` are passed as arguments). 
        
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
        i18nEventName: 'language'       // optional, defaults to 'language',
        i18nEventAttribute: 'language'  // optional, defaults to 'language' 
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
    
Each time event `i18nEventName` is triggered on `i18nEventObject` object or attribute `i18nEventAttribute` of
model `i18nEventObject` is changed current active modal view will be translated by calling its `this.$el.i18n()`.

## Predefined modal windows

### Text blocks

Show static text blocks as paragraphs:

    // Text blocks as paragraphs
    modalManager.showText({
        type: 'paragraph',
        paragraphCssClass: 'paragraph',             // defaults to 'modal-paragraph'
        blocks: [
            '<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b>',
            'Praesent et convallis neque.',
            'Vivamus vel quam quis nibh ornare viverra.',
            'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        ],
        escapeHtml: false                           // defaults to `true`
    });
    
Show static text blocks as list:    
    
    // Text blocks as list items
    modalManager.showText({
        type: 'list',
        listCssClass: 'list',                       // defaults to 'modal-list'
        listItemCssClass: 'list-item',              // defaults to 'modal-list-item'
        blocks: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Praesent et convallis neque.',
            'Vivamus vel quam quis nibh ornare viverra.',
            'Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        ]
    });
    
### Confirmation

Show confirmation dialog:

    var deferred = modalManager.confirm({
        title: 'Confirmation',
        text: 'Are you sure that you want to confirm something?',
        confirmButtonCaption: 'Confirm',            // defaults to 'Yes'
        confirmButtonCaptionI18n: 'modal.yes'       // defaults to 'modal.yes'
        declineButtonCaption: 'Decline'             // defaults to 'No',
        declineButtonCaption: 'modal.no'            // defaults to 'modal.no'
    });
    deferred.done(function() {
        console.log('confirmed');
    });
    deferred.fail(function() {
        console.log('declined');
    });        

## Contribution

Before making a pull request, please, be sure that your changes are rebased to `dev` branch.
