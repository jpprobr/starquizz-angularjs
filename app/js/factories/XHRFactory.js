(function () {
    'use strict';

    angular
        .module('App')
        .factory('XHRFactory', ['$http', function ($http) {
            return {
                get: function (serviceURL, params) {                                                       
                    return $http.get(serviceURL, params);
                },
                post: function (serviceURL, data) {
                    return $http.post(serviceURL, data);
                },
                save: function (serviceURL, data, configurations) {
                    return $http.post(serviceURL, data, configurations);
                },
                update: function (serviceURL, data) {
                    return $http.put(serviceURL, data);
                },
                delete: function (serviceURL) {
                    return $http.delete(serviceURL);
                }
            };
        }]);
}());
