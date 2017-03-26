angular.module('app')
    .controller('MovieDetailsController', function($scope, $state, GuideboxService) {
        GuideboxService.getMovieById($state.params.id)
            .then(function(res) {
                $scope.movie = res;
                $scope.movie.cast = res.cast.join(', ');
                let duration = Number(res.duration);

                var hours = Math.floor(duration / 3600);
                var minutes = Math.floor(duration % 3600 / 60);

                $scope.movie.duration = `${hours} hrs ${minutes} min`;

                console.log($scope.movie);
            }, function(err) {
                console.log(err);
            })
    });
