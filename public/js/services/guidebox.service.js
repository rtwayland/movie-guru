angular.module('app')
    .service('GuideboxService', function($http) {
        this.getMovie = function(title) {
            return $http.get('/api/get-movie/' + title)
                .then(function(res) {
                    return res.data;
                }, function(err) {
                    console.log(err);
                })
        }
    });
