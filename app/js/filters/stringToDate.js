(function() {
    'use strict';

    angular
        .module( 'App' )
        .filter( 'stringToDate', function() {
            return function( value ) {
                value = value || '';

                if ( value === '' ) {
                    return value;
                }

                value = value.replace( /\//g, '' );

                var day = value.substr( 0, 2 ),
                    month = value.substr( 2, 2 ),
                    year = value.substr( 4, 4 );

                return year + '-' + month + '-' + day;
            };
        });
}());
