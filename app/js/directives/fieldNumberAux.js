(function () {
    'use strict';

    angular
        .module('App')
        .directive('fieldNumberAux', [function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attrs) {
                    element.on('keypress', function (e) {
                        var char = e.char || String.fromCharCode(e.charCode);

                        if ([0, 8].indexOf(e.charCode) !== -1) {
                            return false;
                        }

                        if (!/[0-9 ]$/i.test(char)) {
                            e.preventDefault();
                            return false;
                        }

                        return true;
                    });
                }
            };
        }]);
}());
