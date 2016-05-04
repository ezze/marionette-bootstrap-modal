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

    var buttonStyles = [
        'default',
        'primary',
        'info',
        'warning',
        'danger'
    ];

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
                i18nEventName = options.i18nEventName,
                i18nEventAttribute = options.i18nEventAttribute;
            this._i18nEventObject = i18nEventObject && _.isFunction(i18nEventObject.trigger) ? i18nEventObject : null;
            this._i18nEventName = _.isString(i18nEventName) ? i18nEventName : 'language';
            this._i18nEventAttribute = _.isString(i18nEventAttribute) ? i18nEventAttribute : 'language';

            if (this._i18nEventObject) {
                this.listenTo(this._i18nEventObject, this._i18nEventName, this.translate);
                this.listenTo(this._i18nEventObject, 'change:' + this._i18nEventAttribute, this.translate);
            }
        },
        translate: function() {
            this.$el.i18n();
        },
        show: function() {
            var that = this,
                deferred = new $.Deferred(),
                hideDeferred = (this._hideDeferred = new $.Deferred()),
                closeButton = this.model.get('closeButton'),
                beforeCloseHandler = this.model.get('beforeCloseHandler'),
                closeHandler = this.model.get('closeHandler');

            this.$el.modal({
                backdrop: closeButton ? true : 'static',
                keyboard: false,
                show: true
            }).one('shown.bs.modal', function() {
                deferred.resolve(that);
            }).one('hidden.bs.modal', _.bind(function() {
                if (_.isFunction(closeHandler)) {
                    closeHandler.apply(this, [this.getRegion('body').currentView]);
                }
                hideDeferred.resolve(that);
                this.$el.off('hide.bs.modal');

            }, this));

            this.$el.on('hide.bs.modal', _.bind(function(event) {
                if (_.isFunction(beforeCloseHandler)) {
                    if (beforeCloseHandler.apply(this, [this.getRegion('body').currentView]) === false) {
                        event.preventDefault();
                    }
                }
            }, this));

            return deferred;
        },
        hide: function() {
            if (this._hideDeferred === null) {
                return null;
            }

            this.$el.modal('hide');

            return this._hideDeferred;
        },
        isButtonEnabled: function(id) {
            var $button = this.ui.button.filter('[data-id="' + id + '"]');
            return !$button.hasClass('disabled');
        },
        setButtonEnabled: function(id, enabled) {
            var $button = this.ui.button.filter('[data-id="' + id + '"]');
            if (enabled) {
                $button.removeClass('disabled');
            }
            else {
                $button.addClass('disabled');
            }
        },
        getButtonStyle: function(id) {
            var $button = this.ui.button.filter('[data-id="' + id + '"]'),
                style = null;
            _.each(buttonStyles, function(buttonStyle) {
                if ($button.hasClass('btn-' + buttonStyle)) {
                    style = buttonStyle;
                    return false;
                }
                return true;
            });
            return style ? style : null;
        },
        setButtonStyle: function(id, style) {
            var $button = this.ui.button.filter('[data-id="' + id + '"]');
            _.each(buttonStyles, function(buttonStyle) {
                $button.removeClass('btn-' + buttonStyle);
            });
            $button.addClass('btn-' + style);
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