import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { MovieService } from '../../Services/movie.service';
import { SuggestionService } from '../../Services/suggestion.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchTitle') searchTitleRef: ElementRef;
  @Output() masterMovie = new EventEmitter<Object>();
  @Output() masterMovieList = new EventEmitter<Object>();
  @Output() suggestions = new EventEmitter<Object>();

  constructor(private movieService: MovieService, private suggestionService: SuggestionService) { }

  ngOnInit() {
  }

  getMasterMovie() {
    this.movieService.getMasterMovie(this.searchTitleRef.nativeElement.value);
  }

  getSuggestions() {
    this.suggestionService.getSuggestions(this.searchTitleRef.nativeElement.value);
  }
  // submitSearch() {
  //   const searchTitle = this.searchTitleRef.nativeElement.value;
  //   if (searchTitle) {
  //     if ($state.current.name == 'results') {
  //       if (!sessionStorage.searchedTitle || sessionStorage.searchedTitle != searchTitle) {
  //         this.searchForNewMovie();
  //       }
  //     } else {
  //       this.goToResults();
  //     }
  //   }
  // }
  //
  // searchForNewMovie() {
  //   sessionStorage.clear();
  //   sessionStorage.searchedTitle = this.searchTitleRef.nativeElement.value;
  //
  //   const searchTitle = encodeURI(this.searchTitleRef.nativeElement.value);
  //   GuideboxService.getMovie(searchTitle)
  //     .then(function(res) {
  //       this.masterMovie = res;
  //       this.masterMovie.emit(res);
  //       // $scope.$parent.masterMovie = res;
  //       sessionStorage.masterMovie = JSON.stringify(res);
  //       this.getSuggestionsAndMovies(searchTitle);
  //     }, function(err) {
  //       console.log(err);
  //     });
  //
  // }
  //
  // goToResults() {
  //   sessionStorage.clear();
  //   sessionStorage.searchedTitle = this.searchTitleRef.nativeElement.value;
  //   $state.go('results', {
  //     search: this.searchTitleRef.nativeElement.value
  //   })
  // }
  //
  // getSuggestionsAndMovies(searchTitle: string) {
  //   SuggestionService.getSuggestions(searchTitle)
  //     .then(function(res) {
  //       this.suggestions = res;
  //       this.suggestions.emit(res);
  //       // $scope.$parent.suggestions = res;
  //       sessionStorage.suggestions = JSON.stringify(res);
  //       this.masterMovieList = [];
  //       this.masterMovieList.emit();
  //       // $scope.$parent.masterMovieList = [];
  //       for (var i = 0; i < this.suggestions.length; i++) {
  //         (function(num) {
  //           this.fillMovieList(this.suggestions[num]);
  //         })(i);
  //       }
  //     },
  //     function(err) {
  //       console.log(err);
  //     });
  //
  // }
  //
  // fillMovieList(title: string) {
  //   const searchTitle = encodeURI(title);
  //   GuideboxService.getMovie(searchTitle)
  //     .then(function(res) {
  //       if (res && !res.status) {
  //         this.masterMovieList.push(res);
  //         this.masterMovieList.emit();
  //         sessionStorage.masterMovieList = JSON.stringify(this.masterMovieList);
  //       }
  //     }, function(err) {
  //       console.log(err);
  //     });
  // }
}
