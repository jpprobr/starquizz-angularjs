(function () {
    'use strict';

    angular
        .module('App')
        .controller('ModalCtrl', [
            '$scope', '$uibModalInstance', 'modalSettings', 'validation', 'FormMessages', 'ScoresStorageFactory',
            function ($scope, $uibModalInstance, modalSettings, validation, FormMessages, ScoresStorageFactory) {

                $scope.modal = modalSettings;
                $scope.submitted = false;
                $scope.validation = validation.rules(this);
                $scope.messages = FormMessages;
                $scope.form = {};

                $scope.close = close;
                $scope.dismiss = dismiss;
                $scope.save = save;

                function close(value) {
                    $uibModalInstance.close(value);
                }

                function dismiss(value) {
                    $uibModalInstance.dismiss(value);
                }

                function save(model){

                    if ($scope.modal.timer <= 0){
                        swal("Tempo esgotado!", "Na próxima seja rápido como a Millenium falcon!", "error");
                        return;
                    }

                    var jsonParsed = ScoresStorageFactory.getStorage(model.email);
                    if (jsonParsed){
                        swal("E-mail já informado!", "Insira outro e-mail ou jogue novamente", "error");
                        return;
                    }

                    $scope.submitted = true;
                    var objSaveGame = {
                        user: model,
                        game: $scope.modal.userGame,
                        timer: $scope.modal.timer
                    };

                    ScoresStorageFactory.setStorage(model.email, JSON.stringify(objSaveGame));
                    
                    $uibModalInstance.close('confirm');
                }
            }
        ]);
}());
