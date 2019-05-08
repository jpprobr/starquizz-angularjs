(function () {
    'use strict';

    angular
        .module('App')
        .constant('ModalMessages', {
            titles: {
                defaultModalTitle: 'Mensagem do Sistema', 
                deleteModalTitle: 'Exclusão',
                confirmLogout: 'Sair do Sistema',
                errorLogin: 'Erro ao Acessar o Sistema',
                finalizeQuizz: 'Finalização do Quizz',                
                defaultAlert: 'Atenção',
            },
            messages: {
                defaultModalMessage: 'Mensagem do Sistema.',
                confirmationDeleteMsg: 'Deseja realmente excluir esse item?',
                confirmLogout: 'Deseja realmente sair do sistema?',
                errorLogin: 'Erro ao acessar o sistema!',
                connectionToServerError: 'Erro de conexão com o servidor. Favor entrar em contato com o suporte.',
                notAuthorized: 'Usuário ou senha inválidos.',
                userHasNoAccess: 'Este usuário não tem permissão para acessar o sistema.',
                notFound: 'Página não encontrada.',
                finalizeQuizz: 'Deseja realmente finalizar o Quizz?'
            }
        });
}());
