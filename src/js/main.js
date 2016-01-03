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
                    }
                });
            });
        });
    };
});