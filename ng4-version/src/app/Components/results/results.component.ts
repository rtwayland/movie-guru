import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  searchTitle: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchTitle = this.route.snapshot.params['title'];
    // this.route.params
    //   .subscribe(
    //   (params: Params) => {
    //     this.searchTitle = params['title']
    //   }
    //   );
  }

}
