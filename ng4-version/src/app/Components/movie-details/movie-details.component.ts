import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { GuideboxService } from '../../Services/guidebox.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
    movieId: number;

  constructor(private guideboxService: GuideboxService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.movieId = this.route.snapshot.params['id'];
  }
  /*
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
  */

}
