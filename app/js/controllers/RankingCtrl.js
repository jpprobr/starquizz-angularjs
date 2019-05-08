(function () {
    'use strict';

    angular
        .module('App')
        .controller('RankingCtrl', ['$filter', 'ScoresStorageFactory',
            function ($filter, ScoresStorageFactory) {
                
                var vm = this;
                vm.list = [];

                init();

                function init(){
                    getRankingList();
                }

                function getRankingList(){
                    var keys = Object.keys(localStorage);
                    var i, values = [];

                    for (i = 0; i < keys.length; i++) {
                                            
                        var item = localStorage.getItem(keys[i]);
                        var itemParsed = JSON.parse(item);

                        if (itemParsed && itemParsed.user && itemParsed.game && itemParsed.game.totalScore){
                            values.push(itemParsed);
                        }
                    }

                    vm.list = $filter('orderBy')(values, '-game.totalScore');
                }
            }
        ]);
}());
