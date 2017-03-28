angular.module('app')
    .directive('searchBar', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/search-bar/search-bar.html',
            scope: {

            },
            link: function(scope, elem, attrs) {

            },
            controller: function($scope, $state, TastekidService, GuideboxService) {
                $scope.submitSearch = function() {
                    sessionStorage.clear();

                    if ($state.current.name == 'results') {
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
                    } else {
                        $state.go('results', {
                            search: $scope.searchTitle
                        })
                    }
                }

                function getSuggestionsAndMovies(searchTitle) {
                    TastekidService.getSuggestions(searchTitle)
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
