/* global define: false */
define([
    './require-config'
], function(
    requireConfig
) {
    'use strict';

    require(requireConfig);

    return function() {
        require([
            'backbone',
            'jquery',
            'lodash',
            'marionette',
            './modal-manager'
        ], function(
            Backbone,
            $,
            _,
            Marionette,
            ModalManager
        ) {
            $(function() {
                var modalManager = new ModalManager({
                    container: 'body'
                });

                $('body').on('click', '.modal-button', function(event) {
                    var $target = $(event.currentTarget),
                        dataModal = $target.attr('data-modal');

                    switch (dataModal) {
                        case 'function':
                            modalManager.show({
                                title: 'JavaScript function',
                                view: new Marionette.ItemView({
                                    template: function(params) { return '<p>Hello, ' + params.value + '!</p>'; },
                                    model: new Backbone.Model({
                                        value: 'world'
                                    })
                                })
                            });
                            break;

                        case 'micro-template':
                            modalManager.show({
                                title: 'Underscore micro-template',
                                view: new Marionette.ItemView({
                                    template: _.template('<p>Hello, <%- value %>!</p>'),
                                    model: new Backbone.Model({
                                        value: 'world'
                                    })
                                })
                            });
                            break;

                        case 'paragraph-text':
                            modalManager.showText({
                                title: 'Paragraph text blocks',
                                type: 'paragraph',
                                paragraphCssClass: 'modal-paragraph',
                                blocks: [
                                    /* jshint ignore:start */
                                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et convallis neque. Vivamus vel quam quis nibh ornare viverra. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
                                    'Etiam sed sapien quis ex pulvinar egestas a ut velit. Sed malesuada sodales ex, nec interdum felis gravida a. Aenean sagittis, quam nec suscipit imperdiet, quam sapien lobortis augue, nec tempus nunc lacus ac odio.',
                                    'Aenean orci turpis, fringilla a blandit vitae, cursus non erat. Suspendisse elementum, enim vitae gravida viverra, tortor nulla gravida erat, eu fermentum mauris elit id lorem.'
                                    /* jshint ignore:end */
                                ]
                            });
                            break;

                        case 'list-text':
                            modalManager.showText({
                                title: 'List text blocks',
                                type: 'list',
                                listCssClass: 'modal-list',
                                listItemCssClass: 'modal-list-item',
                                blocks: [
                                    /* jshint ignore:start */
                                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et convallis neque. Vivamus vel quam quis nibh ornare viverra. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
                                    'Etiam sed sapien quis ex pulvinar egestas a ut velit. Sed malesuada sodales ex, nec interdum felis gravida a. Aenean sagittis, quam nec suscipit imperdiet, quam sapien lobortis augue, nec tempus nunc lacus ac odio.',
                                    'Aenean orci turpis, fringilla a blandit vitae, cursus non erat. Suspendisse elementum, enim vitae gravida viverra, tortor nulla gravida erat, eu fermentum mauris elit id lorem.'
                                    /* jshint ignore:end */
                                ]
                            });
                            break;
                    }
                });
            });
        });
    };
});