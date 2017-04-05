angular.module('app')
    .controller('ResultsController', function($scope, $state, TastekidService, GuideboxService) {
        function init() {
            let searchTitle = encodeURI($state.params.search);
            if (sessionStorage.masterMovie) {
                $scope.masterMovie = angular.fromJson(sessionStorage.masterMovie);
                getSuggestionsAndMovies(searchTitle);
            } else {
                GuideboxService.getMovie(searchTitle)
                    .then(function(res) {
                        $scope.masterMovie = res;
                        sessionStorage.masterMovie = angular.toJson(res);
                        getSuggestionsAndMovies(searchTitle);
                    }, function(err) {
                        console.log(err);
                    });
            }
            $scope.clearFilters();
        }

        function getSuggestionsAndMovies(searchTitle) {
            if (sessionStorage.suggestions && sessionStorage.masterMovieList) {
                $scope.suggestions = angular.fromJson(sessionStorage.suggestions);
                $scope.masterMovieList = angular.fromJson(sessionStorage.masterMovieList);
                $scope.displayList = $scope.masterMovieList;
            } else {
                TastekidService.getSuggestions(searchTitle)
                    .then(function(res) {
                            $scope.suggestions = res;
                            sessionStorage.suggestions = angular.toJson(res);
                            $scope.masterMovieList = [];

                            for (var i = 0; i < $scope.suggestions.length; i++) {
                                (function(num) {
                                    fillMovieList($scope.suggestions[num]);
                                })(i);
                            }
                        },
                        function(err) {
                            console.log(err);
                        });

            }
        }

        function fillMovieList(title) {
            let searchTitle = encodeURI(title);
            GuideboxService.getMovie(searchTitle)
                .then(function(res) {
                    if (res && !res.status) {
                        $scope.masterMovieList.push(res);
                        sessionStorage.masterMovieList = angular.toJson($scope.masterMovieList);
                    }
                }, function(err) {
                    console.log(err);
                });
        }

        $scope.$watch('masterMovieList', function() {
            $scope.displayList = $scope.masterMovieList;
        })

        /***************** Filter Results *****************/
        $scope.filterResults = function() {
            let masterList = $scope.masterMovieList;
            let subscriptionFiltered = [];
            let filtered = [];
            let netflix = $scope.subscriptions.netflix;
            let prime = $scope.subscriptions.prime;
            let hulu = $scope.subscriptions.hulu;

            if (netflix || prime || hulu) {
                for (var i = 0; i < masterList.length; i++) {
                    if (masterList[i].subscription_web_sources.length) {
                        let subscriptionList = masterList[i].subscription_web_sources;
                        let inserted = false;
                        for (var j = 0; j < subscriptionList.length && !inserted; j++) {
                            switch (subscriptionList[j].display_name) {
                                case "Netflix":
                                    if (netflix) {
                                        subscriptionFiltered.push(masterList[i]);
                                        inserted = true;
                                    }
                                    break;
                                case "Amazon Prime":
                                    if (prime) {
                                        subscriptionFiltered.push(masterList[i]);
                                        inserted = true;
                                    }
                                    break;
                                case "Hulu":
                                    if (hulu) {
                                        subscriptionFiltered.push(masterList[i]);
                                        inserted = true;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }


            if (subscriptionFiltered.length || (netflix || prime || hulu)) {
                masterList = subscriptionFiltered;
            }

            for (var i = 0; i < masterList.length; i++) {
                if (masterList[i].rating == 'R' && $scope.ratings.r == true) {
                    filtered.push(masterList[i]);
                } else if (masterList[i].rating == 'PG-13' && $scope.ratings.pg13 == true) {
                    filtered.push(masterList[i]);
                } else if (masterList[i].rating == 'PG' && $scope.ratings.pg == true) {
                    filtered.push(masterList[i]);
                } else if (masterList[i].rating == 'G' && $scope.ratings.g == true) {
                    filtered.push(masterList[i]);
                } else if (masterList[i].rating == 'NR' && $scope.ratings.nr == true) {
                    filtered.push(masterList[i]);
                } else if (masterList[i].rating == 'NC-17' && $scope.ratings.nc == true) {
                    filtered.push(masterList[i]);
                }
            }

            $scope.displayList = filtered;
        }

        $scope.clearFilters = function() {
            $scope.ratings = {
                r: true,
                pg13: true,
                pg: true,
                g: true,
                nr: true,
                nc: true
            }

            $scope.subscriptions = {
                netflix: false,
                hulu: false,
                prime: false
            }
        }

        init();
    });
