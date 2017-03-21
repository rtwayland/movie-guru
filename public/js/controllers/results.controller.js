angular.module('app')
    .controller('ResultsController', function($scope, $state, TastekidService) {
        function init() {
          let searchTitle = $state.params.search.replace(' ', '+');
            TastekidService.getSuggestions(searchTitle)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.log(err);
                })
        }

        init();
    });
