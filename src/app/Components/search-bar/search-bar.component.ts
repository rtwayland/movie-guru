import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { MovieDataControlService } from '../../Services/movie-data-control.service';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	@ViewChild('searchTitle') searchTitleRef: ElementRef;

	constructor(private movieDataControlService: MovieDataControlService, private router: Router) { }

	ngOnInit() {
	}

	submitSearch() {
		const searchTitle = this.searchTitleRef.nativeElement.value;
		if (searchTitle) {
			this.movieDataControlService.setSearchTitle(searchTitle);
			this.router.navigate(['/results', this.searchTitleRef.nativeElement.value]);
		}
	}
}
