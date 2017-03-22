angular.module('app')
    .controller('ResultsController', function($scope, $state, TastekidService, GuideboxService) {
        function init() {
            let searchTitle = encodeURI($state.params.search);
            GuideboxService.getMovie(searchTitle)
                .then(function(res) {
                    $scope.masterMovie = res;
                    getSuggestionsAndMovies(searchTitle);
                }, function(err) {
                    console.log(err);
                });

        }

        function getSuggestionsAndMovies(searchTitle) {
            TastekidService.getSuggestions(searchTitle)
                .then(function(res) {
                        $scope.suggestions = res;
                        $scope.masterMovieList = [];

                        for (var i = 0; i < $scope.suggestions.length; i++) {
                            (function(num) {
                                fillMovieList($scope.suggestions[num]);
                            })(i);
                        }
                        // console.log('Master List\n', $scope.masterMovieList);
                    },
                    function(err) {
                        console.log(err);
                    });
        }

        function fillMovieList(title) {
            let searchTitle = encodeURI(title);
            GuideboxService.getMovie(searchTitle)
                .then(function(res) {
                    $scope.masterMovieList.push(res);
                }, function(err) {
                    console.log(err);
                });
        }

        $scope.$watch('masterMovieList', function() {
            $scope.displayList = $scope.masterMovieList;
        })

        init();
    });
