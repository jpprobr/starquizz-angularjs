(function () {
    'use strict';

    angular
        .module('App')
        .service('validation', [
            function () {

                function rules(vm) {
                    return {
                        hasError: function (field) {
                            return field.$invalid && (!field.$pristine || (field.$pristine && vm.submitted));
                        },
                        required: function (field) {
                            return field.$error.required && (!field.$pristine || (field.$pristine && vm.submitted));
                        },
                        pattern: function (field) {
                            return field.$error.pattern && (!field.$pristine || (field.$pristine && vm.submitted));
                        },
                        responseDefaultMessage: function (data) {
                            var hasReturnMessage = data && data.hasOwnProperty("mensagemRetorno");
                            return hasReturnMessage && data.mensagemRetorno.hasOwnProperty("mensagem") && data.mensagemRetorno.hasOwnProperty("codigo");
                        },
                        responseHasSuccess: function (data) {
                            return data.mensagemRetorno.codigo === 0;
                        }
                    };
                }

                return {
                    rules: rules
                };
            }
        ]);

})();
