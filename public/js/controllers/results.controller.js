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
                    $scope.masterMovieList.push(res);
                    sessionStorage.masterMovieList = angular.toJson($scope.masterMovieList);
                }, function(err) {
                    console.log(err);
                });
        }

        $scope.$watch('masterMovieList', function() {
            $scope.displayList = $scope.masterMovieList;
        })

        init();
    });
