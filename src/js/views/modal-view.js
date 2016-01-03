define([
    'bootstrap',
    'jquery',
    'marionette',
    'underscore',
    '../templates/modal'
], function(
    Bootstrap,
    $,
    Marionette,
    _,
    template
) {
    'use strict';

    var exports = Marionette.LayoutView.extend({
        className: 'modal fade',
        template: template.modal,
        ui: {
            button: '.modal-button'
        },
        events: {
            'click @ui.button': 'onButtonClick'
        },
        regions: {
            body: '.modal-body'
        },
        initialize: function(options) {
            this._hideDeferred = null;

            var i18nEventObject = options.i18nEventObject,
                i18nEventName = options.i18nEventName;
            this._i18nEventObject = i18nEventObject && _.isFunction(i18nEventObject.trigger) ? i18nEventObject : null;
            this._i18nEventName = _.isString(i18nEventName) ? i18nEventName : 'language';

            if (this._i18nEventObject) {
                this.listenTo(this._i18nEventObject, this._i18nEventName, this.translate);
            }
        },
        translate: function() {
            this.$el.i18n();
        },
        show: function() {
            var that = this,
                deferred = new $.Deferred(),
                hideDeferred = (this._hideDeferred = new $.Deferred()),
                closeButton = this.model.get('closeButton');

            this.$el.modal({
                backdrop: closeButton ? true : 'static',
                keyboard: false,
                show: true
            }).one('shown.bs.modal', function() {
                deferred.resolve(that);
            }).one('hidden.bs.modal', function() {
                hideDeferred.resolve(that);
            });

            return deferred;
        },
        hide: function() {
            if (this._hideDeferred === null) {
                return null;
            }

            this.$el.modal('hide');

            return this._hideDeferred;
        },
        onRender: function() {
            if (this._i18nEventObject) {
                this.translate();
            }

            var view = this.model.get('view');
            if (view) {
                this.getRegion('body').show(view);
            }
        },
        onButtonClick: function(event) {
            event.preventDefault();

            var $button = $(event.currentTarget),
                buttonId = $button.attr('data-id'),
                button = _.find(this.model.get('buttons'), function(button) {
                    return button.id === buttonId;
                });

            if (!button || !_.isFunction(button.handler)) {
                return;
            }

            button.handler.apply(this, [this.getRegion('body').currentView, buttonId]);
        }
    });

    return exports;
});