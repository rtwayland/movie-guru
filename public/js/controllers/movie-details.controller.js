angular.module('app')
    .controller('MovieDetailsController', function($scope, $state, GuideboxService, $sce) {
        if (sessionStorage.masterMovie && sessionStorage.masterMovieList) {

            $scope.masterMovie = angular.fromJson(sessionStorage.masterMovie);
            $scope.masterMovieList = angular.fromJson(sessionStorage.masterMovieList);

            if ($scope.masterMovie.id == $state.params.id) {
                $scope.movie = $scope.masterMovie;
                $scope.movie.cast = $scope.masterMovie.cast.join(', ');
                $scope.movie.duration = getConvertedTime($scope.masterMovie.duration);
            } else {
                for (var i = 0; i < $scope.masterMovieList.length; i++) {
                    if ($scope.masterMovieList[i].id == $state.params.id) {
                        $scope.movie = $scope.masterMovieList[i];
                        $scope.movie.cast = $scope.masterMovieList[i].cast.join(', ');
                        $scope.movie.duration = getConvertedTime($scope.masterMovieList[i].duration);
                        break;
                    }
                }
            }
        } else {
            GuideboxService.getMovieById($state.params.id)
                .then(function(res) {
                    $scope.movie = res;
                    $scope.movie.cast = res.cast.join(', ');

                    $scope.movie.duration = getConvertedTime(res.duration);

                }, function(err) {
                    console.log(err);
                })

        }


        function getConvertedTime(time) {
            let duration = Number(time);

            var hours = Math.floor(duration / 3600);
            var minutes = Math.floor(duration % 3600 / 60);

            return `${hours} hrs ${minutes} min`;
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

    });
