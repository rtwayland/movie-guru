import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { GuideboxService } from '../../Services/guidebox.service';
import { SuggestionGeneratorService } from '../../Services/suggestion-generator.service';
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
  masterMovieList: Object[];
  suggestions: string[];
  // @Output() masterMovieList = new EventEmitter<Object>();
  // @Output() suggestions = new EventEmitter<Object>();

  constructor(private guideboxService: GuideboxService, private suggestionGeneratorService: SuggestionGeneratorService, private movieService: MovieService, private suggestionService: SuggestionService, private router: Router) { }

  ngOnInit() {
  }

  // getMasterMovie() {
  //   this.movieService.getMasterMovie(this.searchTitleRef.nativeElement.value);
  // }
  //
  // getSuggestions() {
  //     console.log(this.router.url)
  //   // this.suggestionService.getSuggestions(this.searchTitleRef.nativeElement.value);
  // }
  submitSearch() {
    const searchTitle = this.searchTitleRef.nativeElement.value;
    if (searchTitle) {
      if (this.router.url.search('results') !== -1) {
        if (!sessionStorage.searchedTitle || sessionStorage.searchedTitle != searchTitle) {
          this.searchForNewMovie();
        }
      } else {
        this.goToResults();
      }
    }
  }

  searchForNewMovie() {
    sessionStorage.clear();
    sessionStorage.searchedTitle = this.searchTitleRef.nativeElement.value;

    const searchTitle = encodeURI(this.searchTitleRef.nativeElement.value);
    this.guideboxService.getMovie(searchTitle)
    .subscribe(
    (movie) => {
        this.masterMovie = movie;
        this.masterMovie.emit(movie);
        sessionStorage.masterMovie = JSON.stringify(movie);
        this.getSuggestionsAndMovies(searchTitle);
    },
    (err) => console.log(err)
    )

  }

  goToResults() {
    sessionStorage.clear();
    sessionStorage.searchedTitle = this.searchTitleRef.nativeElement.value;
    this.router.navigate(['/results', this.searchTitleRef.nativeElement.value]);
  }

  getSuggestionsAndMovies(searchTitle: string) {
    this.suggestionGeneratorService.getSuggestions(searchTitle)
    .subscribe(
    (res) => {
        this.suggestions = res;
        // this.suggestions.emit(res);
        // $scope.$parent.suggestions = res;
        sessionStorage.suggestions = JSON.stringify(res);
        this.masterMovieList = [];
        // this.masterMovieList.emit();
        // $scope.$parent.masterMovieList = [];
        for (var i = 0; i < this.suggestions.length; i++) {
          (function(num) {
            this.fillMovieList(this.suggestions[num]);
          })(i);
        }
    },
    (err) => console.log(err)
    )
    //   .then(function(res) {
    //     this.suggestions = res;
    //     // this.suggestions.emit(res);
    //     // $scope.$parent.suggestions = res;
    //     sessionStorage.suggestions = JSON.stringify(res);
    //     this.masterMovieList = [];
    //     this.masterMovieList.emit();
    //     // $scope.$parent.masterMovieList = [];
    //     for (var i = 0; i < this.suggestions.length; i++) {
    //       (function(num) {
    //         this.fillMovieList(this.suggestions[num]);
    //       })(i);
    //     }
    //   },
    //   function(err) {
    //     console.log(err);
    //   });

  }

  fillMovieList(title: string) {
    const searchTitle = encodeURI(title);
    this.guideboxService.getMovie(searchTitle)
    .subscribe(
    (movie) => {
        if (movie) {
          this.masterMovieList.push(movie);
        //   this.masterMovieList.emit();
          sessionStorage.masterMovieList = JSON.stringify(this.masterMovieList);
        }
    },
    (err) => console.log(err)
    )
    //   .then(function(res) {
    //     if (res && !res.status) {
    //       this.masterMovieList.push(res);
    //       this.masterMovieList.emit();
    //       sessionStorage.masterMovieList = JSON.stringify(this.masterMovieList);
    //     }
    //   }, function(err) {
    //     console.log(err);
    //   });
  }
}
