angular.module('app')
    .controller('SearchController', function($scope, $state) {
        $scope.submitSearch = function() {
            $state.go('results', {
                search: $scope.searchTitle
            })
        }
    });
