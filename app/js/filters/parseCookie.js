(function () {
    'use strict';

    angular
        .module('App')
        .filter('parseCookie', function () {
            return function (value) {
                return JSON.parse(value);
            };
        });
}());
