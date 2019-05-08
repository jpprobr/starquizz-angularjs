(function () {
    'use strict';

    angular
        .module('App')
        .directive('fieldPattern', [function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {

                    element.on('keypress', function (e) {
                        var char = e.char || String.fromCharCode(e.charCode);

                        if ([0, 8].indexOf(e.charCode) !== -1) {
                            return false;
                        }

                        if (!/^[A-Z0-9]$/i.test(char)) {
                            e.preventDefault();
                            return false;
                        }

                        return true;
                    });

                    ngModel.$formatters.push(function (value) {
                        var formattedValue = [];

                        if (ngModel.$isEmpty(value)) {
                            return value;
                        }

                        value = value.split('');

                        for (var index in value) {
                            if (/^[A-Z0-9 ]$/i.test(value[index])) {
                                formattedValue.push(value[index]);
                            }
                        }

                        return formattedValue.join('').toUpperCase();
                    });

                    ngModel.$parsers.push(function (value) {
                        if (ngModel.$isEmpty(value)) {
                            return value;
                        }

                        value = value.toUpperCase();

                        if (ngModel.$viewValue !== value) {
                            ngModel.$setViewValue(value);
                            ngModel.$render();
                        }

                        return value;
                    });
                }
            };
        }]);
}());
