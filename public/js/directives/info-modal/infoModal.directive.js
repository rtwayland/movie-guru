angular.module('app')
    .directive('infoModal', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/info-modal/info-modal.html',
            scope: {
                movie: '=',
                htmlID: '='
            },
            link: function(scope, elem, attrs) {
              
            }
        };
    });
