(function () {
    'use strict';

    angular
        .module('App')
        .controller('GameCtrl', [
            'ServiceURL', 'XHRFactory', 'ModalFactory', '$q', '$http', 'validation', '$timeout', '$location',
            function (ServiceURL, XHRFactory, ModalFactory, $q, $http, validation, $timeout, $location) {
                
                var vm = this;
                vm.validation = validation.rules(vm);
                vm.itens = [];
                vm.page = {
                    size: 10,
                    number: 1
                };
                vm.userGame = {
                    peopleSelected: [],
                    totalScore: 0
                };
                vm.timer = 120;
                vm.setTimer = setTimer;
                vm.hasTimeExpired = hasTimeExpired;
                vm.paginate = paginate;
                vm.getPeople = getPeople;
                vm.showDetails = showDetails;
                vm.guessCharacter = guessCharacter;
                vm.finalizeQuizz = finalizeQuizz;
                                

                init();


                function init() {
                    getPeople();
                }
                
                function setTimer(){
                    if (vm.timer > 0) {
                        vm.timer--;
                    }
                    
                    vm.timeout = $timeout(setTimer, 1000);
                }

                function hasTimeExpired(){
                    return (vm.timer <= 0);
                }

                function alertBlockTime(){
                    swal("Tempo esgotado!", "Na próxima seja rápido como a Millenium falcon!", "error");
                }

                function getPeople(pageUrl){
                    var url = (!pageUrl || pageUrl == null ? ServiceURL.getPeople : pageUrl);
                    XHRFactory.get(url).then(getPeopleSuccess, getPeopleFail);
                }
                
                function getPeopleSuccess(response){

                    if (response.data.results && response.data.results.length > 0){
                        vm.itens = response.data.results;
                        vm.itens.forEach(function(item){
                            var peopleId = getPeopleId(item);
                            item.id = peopleId;
                            item.image = ServiceURL.getPeopleImg + '/' + peopleId + '.jpg';
                            item.linkImg = ServiceURL.getPeopleImg + '/' + peopleId + '.jpg';
                            item.isChecked = peopleHasChecked(item.id);
                        });

                        vm.page.previous = response.data.previous;
                        vm.page.next = response.data.next;
                        vm.page.totalElements = response.data.count;                        
                        var restDiv = ((vm.page.totalElements * 100) % vm.page.size) / 100;
                        vm.page.totalPages = (vm.page.totalElements / vm.page.size) + (restDiv > 0 ? 1 : 0);
                        
                        vm.timeout = $timeout(setTimer, 1000);
                    }
                }
                
                function getPeopleFail(data){
                    console.log('Erro ao buscar Personagens. ');
                    console.log(data);
                    swal('Oops! Algo deu errado ao carregar! :(', 'Estou sentindo uma perturbação na força no momento. Tente novamente em alguns instantes', 'error');
                }
                
                function paginate(){
                    if (vm.page.number){
                        var urlReq = getUrlFromPageNumber(vm.page.number);
                        getPeople(urlReq);
                    }
                    else {
                        getPeople();
                    }
                }

                function getPageNumber(urlPage){
                    return urlPage.substring(34, urlPage.length);
                }

                function getUrlFromPageNumber(pageNumber){
                    return ServiceURL.getPeoplePage.replace("{pageNumber}", pageNumber);
                }              

                function getPeopleId(item){
                    return item.url.substring(28,item.url.length-1);
                }
              
                function removeCommaEndText(text){
                    return (text && text != '' ? text.substring(0, text.length - 2) : text);
                }

                function showDetails(item){

                    if (vm.hasTimeExpired()){
                        alertBlockTime();
                        return;
                    }

                    var promises = [];
                    var result = {
                        planet:   {}, planetName:   '',
                        species:  [], speciesText:  '',
                        films:    [], filmsText:    '',
                        vehicles: [], vehiclesText: ''
                    };

                    promises.push($http.get(item.homeworld).then(function(response){
                        if (response.data){
                            result.planet = response.data;
                            result.planetName = result.planet.name;
                        }
                    }));
                    
                    item.species.forEach(function(url) {
                        promises.push($http.get(url).then(function(response){
                            if (response.data){
                                result.species.push(response.data);
                                result.speciesText += response.data.name + ', ';
                            }
                        }));
                    });

                    item.films.forEach(function(url) {
                        promises.push($http.get(url).then(function(response){
                            if (response.data){
                                result.films.push(response.data);
                                result.filmsText += response.data.title + ', ';
                            }
                        }));
                    });

                    item.vehicles.forEach(function(url) {
                        promises.push($http.get(url).then(function(response){
                            if (response.data){
                                result.vehicles.push(response.data);
                                result.vehiclesText += response.data.name + ', ';
                            }
                        }));
                    });

                    $q.all(promises).then(function(results){
                        var modal = ModalFactory.openModal('detail-modal.html', 'ModalCtrl', {
                            title: 'Details',
                            height: item.height,
                            species: removeCommaEndText(result.speciesText),
                            hair: item.hair_color,
                            planet: result.planetName,
                            films: removeCommaEndText(result.filmsText),
                            vehicles: removeCommaEndText(result.vehiclesText),
                            image: item.image
                        });

                        setOpenedDetails(item);
                    });
                }

                function guessCharacter(item){
                    
                    if (vm.hasTimeExpired()){
                        alertBlockTime();
                        return;
                    }

                    swal("Qual o nome deste personagem?", {
                        content: "input",
                      })
                      .then(function(value) {
                        if (value && isCorrectCharacter(item, value)){
                            swal("Bom trabalho!", "A força esta com você!", "success");
                            setUserScore(item);
                        }
                        else{
                            swal("Concentre-se pequeno Padawan!", "Que a força esteja com você na próxima tentativa!", "error");
                        }                        
                      });                   
                }

                function isCorrectCharacter(item, value){
                    
                    if (value.toLowerCase() === item.name.toLowerCase()){
                        return true;
                    }

                    return false;
                }

                function getSelectedPeople(peopleId){
                    var foundObj = vm.userGame.peopleSelected.find(function(item){
                        return (item.id === peopleId);
                    });

                    return foundObj;
                }

                function peopleHasChecked(peopleId){
                    var peopleSel = getSelectedPeople(peopleId);
                    return (peopleSel && peopleSel.hasAddedScore);
                }

                function setOpenedDetails(item){
                    var peopleSel = getSelectedPeople(item.id);
                    if (peopleSel){
                        peopleSel.hasOpenedDetails = true;
                    }
                    else{
                        peopleSel = {
                            id: item.id,
                            hasOpenedDetails: true
                        };
                        vm.userGame.peopleSelected.push(peopleSel);
                    }
                }

                function setUserScore(item){

                   var peopleSel = getSelectedPeople(item.id);
                    if (peopleSel){

                        if (peopleSel.hasAddedScore){
                            swal("Again!? Seus olhos podem trair você, não confie neles.", "Esse aqui já foi jovem Padawan!", "info");
                            return;
                        }

                        if (peopleSel.hasOpenedDetails && !peopleSel.hasAddedScore){
                            peopleSel.score = 5;
                            peopleSel.hasAddedScore = true;
                            item.isChecked = true;
                            vm.userGame.totalScore += peopleSel.score;                            
                        }
                    }
                    else{
                        peopleSel = {
                            id: item.id,
                            hasAddedScore: true,
                            hasOpenedDetails: false,
                            score: 10                    
                        };

                        item.isChecked = true;
                        vm.userGame.peopleSelected.push(peopleSel);
                        vm.userGame.totalScore += peopleSel.score;
                    }
                }

                function finalizeQuizz(){

                    if (vm.hasTimeExpired()){
                        alertBlockTime();
                        return;
                    }

                    if (!vm.userGame || !vm.userGame.peopleSelected || vm.userGame.peopleSelected.length <= 0){
                        swal('"Sua falta de fé é perturbadora!" (Darth Vader). Selecione ao menos um personagem!');
                        return;
                    }

                    swal("Tem certeza que deseja finalizar o jogo?", {
                        buttons: ["Ainda não. Posso mais!", "Sim, a força está comigo!"],
                    })
                    .then(function(willContinue){
                        
                        if (willContinue){
                            var modal = ModalFactory.openModal('finalization-quizz-modal.html', 'ModalCtrl', {
                                title: 'Quizz Finalizado',
                                userGame: vm.userGame,
                                timer: vm.timer
                            });
                            modal.result.then(function (data) {
                                swal("Quizz finalizado!", "Seu nome agora está registrado na galáxia distante!", "success")
                                .then(function(){
                                    $location.path('/ranking');
                                });
                            });
                        }
                        else{
                            console.log('Ao jogo eu devo voltar (Yd)...');
                        }
                    });      
                }
            }   
        ]);
}());
