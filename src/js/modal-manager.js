define([
    'backbone',
    'jquery',
    'underscore',
    './modal',
    './views/modal-view'
], function(
    Backbone,
    $,
    _,
    Modal,
    ModalView
) {
    'use strict';

    var exports = function(options) {
        this.$container = $(options.container);

        this._modalView = null;

        var i18nEventObject = options.i18nEventObject,
            i18nEventName = options.i18nEventName;
        this._i18nEventObject = i18nEventObject && _.isFunction(i18nEventObject.trigger) ? i18nEventObject : null;
        this._i18nEventName = _.isString(i18nEventName) ? i18nEventName : 'language';
    };

    _.extend(exports.prototype, {
        show: function(options) {
            var modal = options instanceof Modal ? options : new Modal(options);

            if (this._modalView !== null) {
                if (!modal) {
                    return this._modalView.show();
                }

                var that = this,
                    showDeferred = new $.Deferred(),
                    sequentalShowDeferred,
                    hideDeferred = this.hide();

                hideDeferred.done(function() {
                    sequentalShowDeferred = that.show(modal);
                    sequentalShowDeferred.done(function(modalView) {
                        showDeferred.resolve(modalView);
                    });
                });

                return showDeferred;
            }

            this._modalView = new ModalView({
                model: modal,
                i18nEventObject: this._i18nEventObject,
                i18nEventName: this._i18nEventName
            });

            this._modalView.render();
            this.$container.append(this._modalView.$el);

            return this._modalView.show();
        },
        hide: function() {
            if (this._modalView === null) {
                return new $.Deferred().resolve();
            }

            var deferred = this._modalView.hide();
            deferred.done(_.bind(function() {
                if (this._modalView !== null) {
                    this._modalView.destroy();
                    this._modalView = null;
                }
            }, this));

            return deferred;
        },
        getCurrentModalView: function() {
            return this._modalView;
        },
        getCurrentModalBodyView: function() {
            if (this._modalView === null) {
                return null;
            }

            var model = this._modalView.model;
            if (!model) {
                return null;
            }

            var view = model.get('view');
            return view instanceof Backbone.View ? view : null;
        }
    });

    return exports;
});