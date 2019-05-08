(function () {
    'use strict';

    angular
        .module('App')
        .config(['$httpProvider', function ($httpProvider) {

            $httpProvider.interceptors.push('HttpInterceptor');

        }]);
}());
