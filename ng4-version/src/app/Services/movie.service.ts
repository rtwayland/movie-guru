import { Injectable, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import { GuideboxService } from './guidebox.service';

@Injectable()
export class MovieService {
  movieSelected = new EventEmitter<Object>();
  masterMovie: Object;
  masterMovieList: Object[];

  constructor(private guideboxService: GuideboxService) {
    guideboxService.getMovie('rushmore')
      .subscribe(
      (movie) => {
        //   console.log(movie);
          this.masterMovie = movie;
      },
      (err) => console.log(err)
      )
  }
  getMasterMovie(title: string) {
    // return this.masterMovie;
    console.log(encodeURI(title));
    this.guideboxService.getMovie(encodeURI(title))
      .subscribe(
      (movie) => {
          console.log(movie);
          return movie;
      },
      (err) => console.log(err)
      )
  }
  getMovieList() {
    return this.masterMovieList.slice();
  }

  addMovie(movie: Object) {
    this.masterMovieList.push(movie);
  }

}
