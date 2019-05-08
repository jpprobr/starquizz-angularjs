(function () {
    'use strict';
        
    angular
        .module('App')
        .constant('ServiceURL', {
            getPeople: 'https://swapi.co/api/people',
            getSpecies: 'https://swapi.co/api/species/',
            getFilms: 'https://swapi.co/api/films',
            getPlanets: 'https://swapi.co/api/planets',
            getPeopleImg: 'https://starwars-visualguide.com/assets/img/characters',
            getPeoplePage: 'https://swapi.co/api/people/?page={pageNumber}',
        });
}());
