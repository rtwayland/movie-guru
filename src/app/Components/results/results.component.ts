import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription} from 'rxjs/Subscription';

import { GuideboxService } from '../../Services/guidebox.service';
import { SuggestionGeneratorService } from '../../Services/suggestion-generator.service';
import { MovieDataControlService } from '../../Services/movie-data-control.service';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
	searchTitle: string;
	masterMovie: Object;
	masterMovieList: Object[];
	ratings: { r: boolean, pg13: boolean, pg: boolean, g: boolean, nr: boolean, nc: boolean };
	subscriptions: { netflix: boolean, prime: boolean, hulu: boolean };
	movieSubscription: Subscription;
	movieListSubscription: Subscription;

	constructor(private guideboxService: GuideboxService, private suggestionGeneratorService: SuggestionGeneratorService, private movieDataControlService: MovieDataControlService, private route: ActivatedRoute) { }

	ngOnInit() {
		console.log('Inside the results init');
		this.searchTitle = this.route.snapshot.params['title'];
		this.route.params
			.subscribe(
			(params: Params) => {
				this.searchTitle = params['title'];
				this.movieDataControlService.setSearchTitle(this.searchTitle);
			}
			);

		this.movieSubscription = this.movieDataControlService.masterMovie$
			.subscribe((movie) => this.masterMovie = movie)
		this.movieListSubscription = this.movieDataControlService.masterMovieList$
			.subscribe((movieList) => this.masterMovieList = movieList)

		this.resetFilters();
	}

	ngOnDestroy() {
		console.log('Inside the results destroy');
		this.movieSubscription.unsubscribe();
		this.movieListSubscription.unsubscribe();
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
}
