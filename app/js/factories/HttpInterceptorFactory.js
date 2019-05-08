(function () {
    'use strict';

    angular
        .module('App')
        .factory('HttpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show');
                    return config || $q.when(config);
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hidden');
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    $rootScope.$broadcast('loading:hidden');
                    return $q.reject(response);
                }
            };
        }]);
}());
