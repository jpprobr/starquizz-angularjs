(function() {
    'use strict';

    angular
        .module( 'App' )
        .directive( 'fieldMessage', [function() {
            return {
                restrict: 'E',
                scope: {
                    message: '@'
                },
                templateUrl: 'templates/directives/field-message.html'
            };
        }]);
}());
