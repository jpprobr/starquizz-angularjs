(function () {
    'use strict';

    angular
        .module('App')
        .factory('MessageFactory', ['ModalMessages', 'ModalFactory', 'ModalDefinitions',
            function (ModalMessages, ModalFactory, ModalDefinitions) {

                return {
                    openModal: function (settings) {
                        var definitions = null;

                        settings.callback = settings.callback || function () {};
                        settings.title = settings.title || ModalMessages.titles.defaultModalTitle;
                        settings.message = settings.message || ModalMessages.messages.defaultModalMessage;

                        switch (settings.type) {
                            case 'confirm' :
                                definitions = ModalDefinitions.confirmModal;
                                break;
                            case 'message' :
                                definitions = ModalDefinitions.messageModal;
                                break;
                            default :
                                definitions = ModalDefinitions.messageModal;
                        }

                        ModalFactory.openModal(definitions.template, definitions.controller, {
                            title: settings.title,
                            message: settings.message,
                            inputRequired: settings.inputRequired || false
                        }).result.then(function (attr) {
                            if ((attr && attr.isConfirm) || !attr) {
                                settings.callback(attr);
                            }
                        });
                    }
                };
            }
        ]);
}());
