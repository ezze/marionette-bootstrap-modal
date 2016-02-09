define([
    'backbone',
    'marionette',
    '../templates/modal-text'
], function(
    Backbone,
    Marionette,
    template
) {
    'use strict';

    var exports = Marionette.ItemView.extend({
        className: 'modal-text',
        template: template['modal-text'],
        serializeData: function() {
            var data = exports.__super__.serializeData.apply(this, arguments);
            data.paragraph = data.type === 'paragraph';
            data.list = data.type === 'list';
            return data;
        }
    });

    return exports;
});