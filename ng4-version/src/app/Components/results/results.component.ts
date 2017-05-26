import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { GuideboxService } from '../../Services/guidebox.service';
import { SuggestionGeneratorService } from '../../Services/suggestion-generator.service';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
	searchTitle: string;
	masterMovie: Object;
	masterMovieList: Object[];
	suggestions: string[];
	ratings: { r: boolean, pg13: boolean, pg: boolean, g: boolean, nr: boolean, nc: boolean };
	subscriptions: { netflix: boolean, prime: boolean, hulu: boolean };

	constructor(private guideboxService: GuideboxService, private suggestionGeneratorService: SuggestionGeneratorService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.searchTitle = this.route.snapshot.params['title'];
		this.route.params
			.subscribe(
			(params: Params) => {
				this.searchTitle = params['title']
			}
			);
		if (sessionStorage.masterMovie) {
			this.masterMovie = JSON.parse(sessionStorage.masterMovie);
			this.getSuggestionsAndMovies(this.searchTitle);
		} else {
			this.guideboxService.getMovie(this.searchTitle)
				.subscribe(
				(movie) => {
					this.masterMovie = movie;
					sessionStorage.masterMovie = JSON.stringify(movie);
					this.getSuggestionsAndMovies(this.searchTitle);
				},
				(err) => console.log(err)
				);
		}
		this.resetFilters();
	}

	setRatings() {
		this.ratings = {
			r: this.ratings.r,
			pg13: this.ratings.pg13,
			pg: this.ratings.pg,
			g: this.ratings.g,
			nr: this.ratings.nr,
			nc: this.ratings.nc
		}
	}
	setSubscriptions() {
		this.subscriptions = {
			netflix: this.subscriptions.netflix,
			prime: this.subscriptions.prime,
			hulu: this.subscriptions.hulu
		}
	}

	resetFilters() {
		this.ratings = { r: true, pg13: true, pg: true, g: true, nr: true, nc: false }
		this.subscriptions = { netflix: false, prime: false, hulu: false }
	}


	getSuggestionsAndMovies(searchTitle: string) {
		if (sessionStorage.suggestions && sessionStorage.masterMovieList) {
			this.suggestions = JSON.parse(sessionStorage.suggestions);
			this.masterMovieList = JSON.parse(sessionStorage.masterMovieList);
		} else {
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
						((num) => {
							this.fillMovieList(this.suggestions[num]);
						})(i);
					}
				},
				(err) => console.log(err)
				);
		}
	}

	fillMovieList(title: string) {
		const searchTitle = encodeURI(title);
		this.guideboxService.getMovie(searchTitle)
			.subscribe(
			(movie) => {
				if (movie) {
					this.masterMovieList.push(movie);
					sessionStorage.masterMovieList = JSON.stringify(this.masterMovieList);
				}
			},
			(err) => console.log(err)
			)
	}

	// $scope.$watch('masterMovieList', function() {
	//     $scope.displayList = $scope.masterMovieList;
	// })

	/***************** Filter Results *****************/
	// $scope.filterResults = function() {
	//     let masterList = $scope.masterMovieList;
	//     // Subscription Variables
	//     let netflix = $scope.subscriptions.netflix;
	//     let prime = $scope.subscriptions.prime;
	//     let hulu = $scope.subscriptions.hulu;
	//     // Rating Variables
	//     let r = $scope.ratings.r;
	//     let pg13 = $scope.ratings.pg13;
	//     let pg = $scope.ratings.pg;
	//     let g = $scope.ratings.g;
	//     let nr = $scope.ratings.nr;
	//     let nc = $scope.ratings.nc;
	//
	//     if (netflix || prime || hulu) {
	//         masterList = filterBySubscription(masterList, $scope.subscriptions);
	//     }
	//
	//     if (!r || !pg13 || !pg || !g || !nr || !nc) {
	//         masterList = filterByRating(masterList, $scope.ratings);
	//     }
	//
	//     $scope.displayList = masterList;
	// }
	//
	// function filterBySubscription(masterList, subscriptions) {
	//     let results = [];
	//     for (var i = 0; i < masterList.length; i++) {
	//         if (masterList[i].subscription_web_sources.length) {
	//             let subscriptionList = masterList[i].subscription_web_sources;
	//             let inserted = false;
	//             for (var j = 0; j < subscriptionList.length && !inserted; j++) {
	//                 switch (subscriptionList[j].display_name) {
	//                     case "Netflix":
	//                         if (subscriptions.netflix) {
	//                             results.push(masterList[i]);
	//                             inserted = true;
	//                         }
	//                         break;
	//                     case "Amazon Prime":
	//                         if (subscriptions.prime) {
	//                             results.push(masterList[i]);
	//                             inserted = true;
	//                         }
	//                         break;
	//                     case "Hulu":
	//                         if (subscriptions.hulu) {
	//                             results.push(masterList[i]);
	//                             inserted = true;
	//                         }
	//                         break;
	//                     default:
	//                         break;
	//                 }
	//             }
	//         }
	//     }
	//     return results;
	// }
	//
	// function filterByRating(masterList, ratings) {
	//     let results = [];
	//     for (var i = 0; i < masterList.length; i++) {
	//         if (masterList[i].rating == 'R' && ratings.r == true) {
	//             results.push(masterList[i]);
	//         } else if (masterList[i].rating == 'PG-13' && ratings.pg13 == true) {
	//             results.push(masterList[i]);
	//         } else if (masterList[i].rating == 'PG' && ratings.pg == true) {
	//             results.push(masterList[i]);
	//         } else if (masterList[i].rating == 'G' && ratings.g == true) {
	//             results.push(masterList[i]);
	//         } else if (masterList[i].rating == 'NR' && ratings.nr == true) {
	//             results.push(masterList[i]);
	//         } else if (masterList[i].rating == 'NC-17' && ratings.nc == true) {
	//             results.push(masterList[i]);
	//         }
	//     }
	//     return results;
	// }
	//
	// $scope.clearFilters = function() {
	//     $scope.ratings = {
	//         r: true,
	//         pg13: true,
	//         pg: true,
	//         g: true,
	//         nr: true,
	//         nc: true
	//     }
	//
	//     $scope.subscriptions = {
	//         netflix: false,
	//         hulu: false,
	//         prime: false
	//     }
	// }

}
