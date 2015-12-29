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
                        case 'marionette-view':
                            modalManager.show({
                                title: 'Marionette view',
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