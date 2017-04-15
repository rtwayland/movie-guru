angular.module('app')
    .directive('searchBar', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/search-bar/search-bar.html',
            scope: {

            },
            link: function(scope, elem, attrs) {

            },
            controller: function($scope, $state, SuggestionService, GuideboxService) {
                $scope.submitSearch = function() {
                    if ($scope.searchTitle) {
                        if ($state.current.name == 'results') {
                            if (!sessionStorage.searchedTitle || sessionStorage.searchedTitle != $scope.searchTitle) {
                                searchForNewMovie();
                            }
                        } else {
                            goToResults();
                        }
                    }
                }

                function searchForNewMovie() {
                    sessionStorage.clear();
                    sessionStorage.searchedTitle = $scope.searchTitle;

                    let searchTitle = encodeURI($scope.searchTitle);
                    GuideboxService.getMovie(searchTitle)
                        .then(function(res) {
                            $scope.masterMovie = res;
                            $scope.$parent.masterMovie = res;
                            sessionStorage.masterMovie = angular.toJson(res);
                            getSuggestionsAndMovies(searchTitle);
                        }, function(err) {
                            console.log(err);
                        });

                }

                function goToResults() {
                    sessionStorage.clear();
                    sessionStorage.searchedTitle = $scope.searchTitle;
                    $state.go('results', {
                        search: $scope.searchTitle
                    })
                }

                function getSuggestionsAndMovies(searchTitle) {
                    SuggestionService.getSuggestions(searchTitle)
                        .then(function(res) {
                                $scope.suggestions = res;
                                $scope.$parent.suggestions = res;
                                sessionStorage.suggestions = angular.toJson(res);
                                $scope.masterMovieList = [];
                                $scope.$parent.masterMovieList = [];
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

                function fillMovieList(title) {
                    let searchTitle = encodeURI(title);
                    GuideboxService.getMovie(searchTitle)
                        .then(function(res) {
                            if (res && !res.status) {
                                $scope.masterMovieList.push(res);
                                $scope.$parent.masterMovieList.push(res);
                                sessionStorage.masterMovieList = angular.toJson($scope.masterMovieList);
                            }
                        }, function(err) {
                            console.log(err);
                        });
                }
            }
        };
    });
