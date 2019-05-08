(function () {
    'use strict';

    angular
        .module('App')
        .constant('FormMessages', {
            defaultFieldError: 'Verifique os erros apontados!',
            emailField: 'Este e-mail é inválido.',
            requiredField: 'Obrigatório.',            
            saveSuccess: 'Registro salvo com sucesso!',
            sendSuccess: 'Enviado com sucesso!'            
        });

    angular
        .module('App')
        .constant('GenericFailMessages', {
            getDataFailMessage: 'No momento não foi possível obter dados!',
            sendDataFailMessage: 'No momento não foi possível enviar os dados!'
        });
}());
