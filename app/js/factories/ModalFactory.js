(function () {
    'use strict';

    angular
        .module('App')
        .factory('ModalFactory', ['$uibModal', 'ModalMessages', function ($uibModal, ModalMessages) {

            var defaultSettings = {
                    animation: true,
                    backdrop: 'static',
                    size: 'lg'
                },
                defaultModalSettings = {
                    title: ModalMessages.titles.defaultModalTitle
                },
                modalPath = 'templates/modals/';

            function mergeSettings(settings, modalSettings) {
                var mergedSettings = angular.extend({}, defaultSettings, settings);

                mergedSettings.resolve = {
                    modalSettings: angular.extend({}, defaultModalSettings, modalSettings)
                };

                return mergedSettings;
            }

            return {
                openModal: function (templateName, modalController, modalSettings) {
                    var settings = mergeSettings({
                        controller: modalController,
                        templateUrl: modalPath + templateName
                    }, modalSettings);

                    return $uibModal.open(settings);
                }
            };
        }]);
}());
