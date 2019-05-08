(function () {
    'use strict';

    angular
        .module('App')
        .factory('ScoresStorageFactory', [ function () {
            return {
                setStorage: function (user, score) {
                    localStorage.setItem(user, score);
                },
                getStorage: function (user) {
                    return localStorage.getItem(user);
                },
                removeStorage: function(user){
                    localStorage.removeItem(user);
                }
            };
        }]);
}());
