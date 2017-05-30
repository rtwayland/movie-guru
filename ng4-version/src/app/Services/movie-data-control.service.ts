import { Injectable, EventEmitter } from '@angular/core';

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import { GuideboxService } from './guidebox.service';
import { SuggestionGeneratorService } from './suggestion-generator.service';

@Injectable()
export class MovieDataControlService {
	searchTitle: string;
	masterMovie: Object;
	masterMovieList: Object[];
	suggestions: string[];
	masterMovieSource = new BehaviorSubject<any>({});
	masterMovieListSource = new BehaviorSubject<any[]>([]);
	masterMovie$ = this.masterMovieSource.asObservable().share();
	masterMovieList$ = this.masterMovieListSource.asObservable().share();

	constructor(private guideboxService: GuideboxService, private suggestionGeneratorService: SuggestionGeneratorService) {
		if (sessionStorage.searchTitle) {
			this.searchTitle = sessionStorage.searchTitle;
			this.prepareData();
		}
	}

	setSearchTitle(title: string) {
		if (this.searchTitle !== title) {
			this.searchTitle = title;
			sessionStorage.searchTitle = this.searchTitle;
			console.log('Setting new Title')
			this.prepareData();
		} else {
			console.log('No title change')
		}
	}

	private prepareData() {
		if (this.masterMovie && sessionStorage.masterMovie) {
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
		if ((this.suggestions && sessionStorage.suggestions) && (this.masterMovieList && sessionStorage.masterMovieList)) {
			this.suggestions = JSON.parse(sessionStorage.suggestions);
			this.masterMovieList = JSON.parse(sessionStorage.masterMovieList);
		} else {
			this.suggestionGeneratorService.getSuggestions(searchTitle)
				.subscribe(
				(res) => {
					this.suggestions = res;
					sessionStorage.suggestions = JSON.stringify(res);
					this.masterMovieList = [];
					for (let i = 0; i < this.suggestions.length; i++) {
						((num) => {
							this.fillMovieList(this.suggestions[num]);
						})(i);
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
					this.masterMovieList = [...this.masterMovieList, movie];
					sessionStorage.masterMovieList = JSON.stringify(this.masterMovieList);
					this.masterMovieListSource.next(this.masterMovieList);
				}
			},
			(err) => console.log(err)
			)
	}

}
