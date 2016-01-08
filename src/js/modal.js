define([
    'backbone',
    'underscore'
], function(
    Backbone,
    _
) {
    'use strict';

    var exports = Backbone.Model.extend({
        defaults: {
            title: '',
            titleI18n: '',
            view: null,
            closeButton: true,
            closeButtonCaption: 'Close',
            closeButtonCaptionI18n: 'modal.close',
            closeButtonStyle: 'default',
            buttons: []
        },
        initialize: function() {
            _.each(this.get('buttons'), function(button, index) {
                if (!_.isString(button.id)) {
                    button.id = 'button-' + (index + 1);
                }
            });
        }
    });

    return exports;
});