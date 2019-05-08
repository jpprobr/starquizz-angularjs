(function () {
    'use strict';

    angular
        .module('App')
        .config(['$routeProvider', function ($routeProvider) {
                  
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/views/home/index.html',
                    controller: 'HomeCtrl'
                })                
                .when('/game', {
                    templateUrl: 'templates/views/game/index.html',
                    controller: 'GameCtrl'
                })
                .when('/ranking', {
                    templateUrl: 'templates/views/game/ranking.html',
                    controller: 'RankingCtrl'
                })
                .when('/404', {
                    templateUrl: 'templates/views/404.html'
                })
                .otherwise({
                    redirectTo: '/404'
                });
        }]);
}());
