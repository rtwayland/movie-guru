import { Injectable } from '@angular/core';

import { uniqBy } from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { GuideboxService } from './guidebox.service';
import { SuggestionGeneratorService } from './suggestion-generator.service';

@Injectable()
export class MovieDataControlService {
	searchTitle: string;
	masterMovie: {};
	masterMovieList: {}[];
	suggestions: string[];
	masterMovieSource = new BehaviorSubject<any>({});
	masterMovieListSource = new BehaviorSubject<any[]>([]);
	masterMovie$ = this.masterMovieSource.asObservable().share();
	masterMovieList$ = this.masterMovieListSource.asObservable().share();

	constructor(private guideboxService: GuideboxService, private suggestionGeneratorService: SuggestionGeneratorService) {
		this.searchTitle = '';
	}

	setSearchTitle(title: string) {
		if (this.searchTitle.toLowerCase() !== title.toLowerCase()) {
			this.searchTitle = title;
			this.masterMovie = {};
			this.masterMovieList = [];
			this.masterMovieSource.next(this.masterMovie);
			this.masterMovieListSource.next(this.masterMovieList);
			sessionStorage.searchTitle = this.searchTitle;
			this.prepareData();
		}
	}

	private prepareData() {
		if ((this.masterMovie && Object.keys(this.masterMovie).length !== 0) && sessionStorage.masterMovie) {
			this.masterMovie = JSON.parse(sessionStorage.masterMovie);
			this.getSuggestionsAndMovies(this.searchTitle);
		} else {
			this.guideboxService.getMovie(this.searchTitle)
				.subscribe(
				(movie) => {
					this.masterMovie = movie;
					this.masterMovieSource.next(movie);
					sessionStorage.masterMovie = JSON.stringify(movie);
					this.getSuggestionsAndMovies(this.searchTitle);
				},
				(err) => console.log(err)
				);
		}
	}

	private getSuggestionsAndMovies(searchTitle: string) {
		if ((this.masterMovieList && this.masterMovieList.length > 0) && sessionStorage.masterMovieList) {
			this.masterMovieList = JSON.parse(sessionStorage.masterMovieList);
		} else {
			this.suggestionGeneratorService.getSuggestions(searchTitle)
				.subscribe(
				(res) => {
					this.suggestions = res;
					sessionStorage.suggestions = JSON.stringify(res);
					this.masterMovieList = [];
					if (this.suggestions.length > 0) {
						for (let i = 0; i < this.suggestions.length; i++) {
							((num) => {
								this.fillMovieList(this.suggestions[num]);
							})(i);
						}
					} else {
						this.masterMovieListSource.next(this.masterMovieList);
					}
				},
				(err) => console.log(err)
				);
		}
	}

	private fillMovieList(title: string) {
		const searchTitle = encodeURI(title);
		this.guideboxService.getMovie(searchTitle)
			.subscribe(
			(movie) => {
				if (movie) {
					this.masterMovieList = [...uniqBy(this.masterMovieList, 'id'), movie];
					sessionStorage.masterMovieList = JSON.stringify(this.masterMovieList);
					this.masterMovieListSource.next(this.masterMovieList);
				}
			},
			(err) => console.log(err)
			);
	}

}
