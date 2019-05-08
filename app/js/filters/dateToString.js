(function() {
    'use strict';

    angular
        .module( 'App' )
        .filter( 'dateToString', function() {
            return function( value ) {

                value = value || '';

                return value
                .substr( 0, 10 )
                .split( '-' )
                .reverse()
                .join( '/' );
            };
        });
}());
