import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/RX';

@Injectable()
export class SuggestionGeneratorService {

  constructor(private http: Http) { }
  getSuggestions(title: string) {
    return this.http.get('/api/movie-suggestions/' + title)
        .map(
            (response: Response) => {
                if (response.status === 200) {
                    const data = response.json();
                    let movieTitleArray = data.map((item) => item.Name);
                    return movieTitleArray;
                } else {
                    return;
                }
            }
        )
  }
}
