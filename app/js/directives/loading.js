(function () {
    'use strict';

    angular
        .module('App')
        .directive('loading', [function () {
            return {
                restrict: 'E',
                link: function (scope) {
                    var requests = 0;

                    scope.show = false;

                    scope.$on('loading:show', function () {
                        if (requests === 0) {
                            scope.show = true;
                        }

                        requests++;
                    });

                    scope.$on('loading:hidden', function () {
                        if (requests === 1) {
                            scope.show = false;
                            requests--;
                        } else if (requests !== 0) {
                            requests--;
                        }
                    });
                },
                templateUrl: 'templates/directives/loading.html'
            };
        }]);
}());
