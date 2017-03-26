angular.module('app')
    .directive('movie', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/movie/movie.html',
            scope: {
                movie: '='
            },
            link: function(scope, elem, attrs) {
              
            }
        };
    });
