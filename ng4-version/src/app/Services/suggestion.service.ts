import { Injectable, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import { SuggestionGeneratorService } from './suggestion-generator.service';

@Injectable()
export class SuggestionService {
  suggestions: string[];

  constructor(private suggestionsGeneratorService: SuggestionGeneratorService) { }
  getSuggestions(title: string) {
    // return this.masterMovie;
    console.log(encodeURI(title));
    this.suggestionsGeneratorService.getSuggestions(encodeURI(title))
      .subscribe(
      (suggestions) => {
        console.log(suggestions);
        return suggestions;
      },
      (err) => console.log(err)
      )
  }

}
