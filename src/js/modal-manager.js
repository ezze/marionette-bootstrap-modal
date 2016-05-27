define([
    'backbone',
    'jquery',
    'underscore',
    './modal',
    './views/modal-text-view',
    './views/modal-view'
], function(
    Backbone,
    $,
    _,
    Modal,
    ModalTextView,
    ModalView
) {
    'use strict';

    var exports = function(options) {
        this.$container = $(options.container);

        this._modalView = null;

        var i18nEventObject = options.i18nEventObject,
            i18nEventName = options.i18nEventName,
            i18nEventAttribute = options.i18nEventAttribute;
        this._i18nEventObject = i18nEventObject && _.isFunction(i18nEventObject.trigger) ? i18nEventObject : null;
        this._i18nEventName = _.isString(i18nEventName) ? i18nEventName : 'language';
        this._i18nEventAttribute = _.isString(i18nEventAttribute) ? i18nEventAttribute : 'language';
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
                i18nEventName: this._i18nEventName,
                i18nEventAttribute: this._i18nEventAttribute
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
        },
        showText: function(options) {
            options = options || {};

            var additionalView = null;
            if (options.view instanceof Backbone.View) {
                additionalView = options.view;
            }

            options.view = new ModalTextView({
                model: new Backbone.Model({
                    blocks: options.blocks || [],
                    type: options.type || 'paragraph',
                    paragraphCssClass: options.paragraphCssClass || 'modal-paragraph',
                    listCssClass: options.listCssClass || 'modal-list',
                    listItemCssClass: options.listItemCssClass || 'modal-list-item',
                    escapeHtml: _.isBoolean(options.escapeHtml) ? options.escapeHtml : true,
                    additionalView: additionalView,
                    additionalViewOnTop: _.isBoolean(options.viewOnTop) ? options.viewOnTop : false
                })
            });

            _.each([
                'blocks',
                'type',
                'paragraphCssClass',
                'listCssClass',
                'listItemCssClass'
            ], function(item) {
                if (options[item]) {
                    delete options[item];
                }
            });

            return this.show(options);
        },
        confirm: function(options) {
            var deferred = new $.Deferred();

            var additionalView = null;
            if (options.view instanceof Backbone.View) {
                additionalView = options.view;
            }

            options.view = new ModalTextView({
                model: new Backbone.Model({
                    blocks: [options.text || 'Confirm?'],
                    type: 'paragraph',
                    paragraphCssClass: options.textCssClass || 'modal-confirmation-text',
                    escapeHtml: _.isBoolean(options.escapeHtml) ? options.escapeHtml : true,
                    additionalView: additionalView,
                    additionalViewOnTop: _.isBoolean(options.viewOnTop) ? options.viewOnTop : false
                })
            });

            options.closeButton = false;
            options.buttons = [{
                id: 'yes',
                caption: options.confirmButtonCaption || 'Yes',
                captionI18n: options.confirmButtonCaptionI18n || 'modal.yes',
                style: 'primary',
                handler: function() {
                    var hideDeferred = this.hide();
                    hideDeferred.always(function() {
                        deferred.resolve();
                    });
                }
            }, {
                id: 'no',
                caption: options.declineButtonCaption || 'No',
                captionI18n: options.declineButtonCaptionI18n || 'modal.no',
                handler: function() {
                    var hideDeferred = this.hide();
                    hideDeferred.always(function() {
                        deferred.reject();
                    });
                }
            }];

            _.each([
                'text',
                'textCssClass',
                'confirmButtonCaption',
                'confirmButtonCaptionI18n',
                'declineButtonCaption',
                'declineButtonCaptionI18n'
            ], function(item) {
                if (options[item]) {
                    delete options[item];
                }
            });

            this.show(options);

            return deferred;
        }
    });

    return exports;
});