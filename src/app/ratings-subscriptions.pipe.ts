import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'ratingsSubscriptions'
})
export class RatingsSubscriptionsPipe implements PipeTransform {
	transform(movieList: any, ratings: any, subscriptions: any): any {
		const {r, pg13, pg, g, nr, nc} = ratings;
		const {netflix, prime, hulu} = subscriptions;
		if (netflix || prime || hulu) {
			movieList = this.filterBySubscription(movieList, subscriptions);
		}

		if (!r || !pg13 || !pg || !g || !nr || !nc) {
			movieList = this.filterByRating(movieList, ratings);
		}

		return movieList;
	}

	filterBySubscription(masterList, subscriptions) {
		let results = [];
		const moviesWithSubscriptions = masterList.filter(movie => movie.subscription_web_sources.length > 0)

		for (var i = 0; i < moviesWithSubscriptions.length; i++) {
			let subscriptionList = moviesWithSubscriptions[i].subscription_web_sources;
			let inserted = false;
			for (var j = 0; j < subscriptionList.length && !inserted; j++) {
				switch (subscriptionList[j].display_name) {
					case "Netflix":
						if (subscriptions.netflix) {
							results.push(moviesWithSubscriptions[i]);
							inserted = true;
						}
						break;
					case "Amazon Prime":
						if (subscriptions.prime) {
							results.push(moviesWithSubscriptions[i]);
							inserted = true;
						}
						break;
					case "Hulu":
						if (subscriptions.hulu) {
							results.push(moviesWithSubscriptions[i]);
							inserted = true;
						}
						break;
					default:
						break;
				}
			}
		}
		return results;
	}

	filterByRating(masterList, ratings) {
		return masterList.filter((movie) => {
			if (movie.rating == 'R' && ratings.r == true) {
				return movie;
			} else if (movie.rating == 'PG-13' && ratings.pg13 == true) {
				return movie;
			} else if (movie.rating == 'PG' && ratings.pg == true) {
				return movie;
			} else if (movie.rating == 'G' && ratings.g == true) {
				return movie;
			} else if (movie.rating == 'NR' && ratings.nr == true) {
				return movie;
			} else if (movie.rating == 'NC-17' && ratings.nc == true) {
				return movie;
			}
		});
	}


}
