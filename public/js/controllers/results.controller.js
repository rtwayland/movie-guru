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
            // Subscription Variables
            let netflix = $scope.subscriptions.netflix;
            let prime = $scope.subscriptions.prime;
            let hulu = $scope.subscriptions.hulu;
            // Rating Variables
            let r = $scope.ratings.r;
            let pg13 = $scope.ratings.pg13;
            let pg = $scope.ratings.pg;
            let g = $scope.ratings.g;
            let nr = $scope.ratings.nr;
            let nc = $scope.ratings.nc;

            if (netflix || prime || hulu) {
                masterList = filterBySubscription(masterList, $scope.subscriptions);
            }

            if (!r || !pg13 || !pg || !g || !nr || !nc) {
                masterList = filterByRating(masterList, $scope.ratings);
            }

            $scope.displayList = masterList;
        }

        function filterBySubscription(masterList, subscriptions) {
            let results = [];
            for (var i = 0; i < masterList.length; i++) {
                if (masterList[i].subscription_web_sources.length) {
                    let subscriptionList = masterList[i].subscription_web_sources;
                    let inserted = false;
                    for (var j = 0; j < subscriptionList.length && !inserted; j++) {
                        switch (subscriptionList[j].display_name) {
                            case "Netflix":
                                if (subscriptions.netflix) {
                                    results.push(masterList[i]);
                                    inserted = true;
                                }
                                break;
                            case "Amazon Prime":
                                if (subscriptions.prime) {
                                    results.push(masterList[i]);
                                    inserted = true;
                                }
                                break;
                            case "Hulu":
                                if (subscriptions.hulu) {
                                    results.push(masterList[i]);
                                    inserted = true;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            return results;
        }

        function filterByRating(masterList, ratings) {
            let results = [];
            for (var i = 0; i < masterList.length; i++) {
                if (masterList[i].rating == 'R' && ratings.r == true) {
                    results.push(masterList[i]);
                } else if (masterList[i].rating == 'PG-13' && ratings.pg13 == true) {
                    results.push(masterList[i]);
                } else if (masterList[i].rating == 'PG' && ratings.pg == true) {
                    results.push(masterList[i]);
                } else if (masterList[i].rating == 'G' && ratings.g == true) {
                    results.push(masterList[i]);
                } else if (masterList[i].rating == 'NR' && ratings.nr == true) {
                    results.push(masterList[i]);
                } else if (masterList[i].rating == 'NC-17' && ratings.nc == true) {
                    results.push(masterList[i]);
                }
            }
            return results;
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
