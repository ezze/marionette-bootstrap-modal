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
        ui: {
            additionalViewContainer: '.modal-text-additional-view-container'
        },
        serializeData: function() {
            var data = exports.__super__.serializeData.apply(this, arguments);
            data.paragraph = data.type === 'paragraph';
            data.list = data.type === 'list';
            data.additionalViewTop = (data.additionalView instanceof Backbone.View && data.additionalViewOnTop);
            data.additionalViewBottom = (data.additionalView instanceof Backbone.View && !data.additionalViewOnTop);
            return data;
        },
        onRender: function() {
            var additionalView = this.model.get('additionalView');
            if (!additionalView) {
                return;
            }
            additionalView.render();
            this.ui.additionalViewContainer.append(additionalView.$el);
        }
    });

    return exports;
});