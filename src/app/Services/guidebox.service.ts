import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/RX';

@Injectable()
export class GuideboxService {

  constructor(private http: Http) { }
  getMovie(title: string) {
    return this.http.get('/api/get-movie/' + title)
        .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
        )
  }
  getMovieById(id: number) {
    return this.http.get('/api/get-movie-by-id/' + id)
        .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
        )
  }
}
