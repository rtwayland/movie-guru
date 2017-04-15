angular.module('app')
    .service('SuggestionService', function($http) {
        this.getSuggestions = function(searchTitle) {
            return $http.get('/api/tastekid-suggestions/' + searchTitle)
                .then(function(res) {
                    if (res.status === 200) {
                        let movieTitleArray = [];
                        for (var i = 0; i < res.data.length; i++) {
                            movieTitleArray.push(res.data[i].Name);
                        }
                        return movieTitleArray;
                    } else {
                        return;
                    }
                }, function(err) {
                    console.log(err);
                })
        }
    });
