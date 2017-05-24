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
    masterMovie: any;
	masterMovieList: any[];
    movie: any;

	constructor(private guideboxService: GuideboxService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.movieId = this.route.snapshot.params['id'];
		if (sessionStorage.masterMovie && sessionStorage.masterMovieList) {

			this.masterMovie = JSON.parse(sessionStorage.masterMovie);
			this.masterMovieList = JSON.parse(sessionStorage.masterMovieList);

			if (this.masterMovie.id == this.movieId) {
				this.movie = this.masterMovie;
				this.movie.cast = this.masterMovie.cast.join(', ');
				this.movie.duration = this.getConvertedTime(this.masterMovie.duration);
			} else {
				for (var i = 0; i < this.masterMovieList.length; i++) {
					if (this.masterMovieList[i].id == this.movieId) {
						this.movie = this.masterMovieList[i];
						this.movie.cast = this.masterMovieList[i].cast.join(', ');
						this.movie.duration = this.getConvertedTime(this.masterMovieList[i].duration);
						break;
					}
				}
			}
		} else {
			this.guideboxService.getMovieById(this.movieId)
				.subscribe(
				(res) => {
					this.movie = res;
					this.movie.cast = res.cast.join(', ');

					this.movie.duration = this.getConvertedTime(res.duration);

				}, (err) => {
					console.log(err);
				}
				)

		}
	}



	getConvertedTime(time) {
		let duration = Number(time);

		var hours = Math.floor(duration / 3600);
		var minutes = Math.floor(duration % 3600 / 60);

		return `${hours} hrs ${minutes} min`;
	}

	// trustSrc(src) {
	// 	return $sce.trustAsResourceUrl(src);
	// };

}
