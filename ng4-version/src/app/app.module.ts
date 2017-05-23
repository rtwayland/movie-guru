import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';

import { GuideboxService } from './Services/guidebox.service';
import { SuggestionGeneratorService } from './Services/suggestion-generator.service';
import { MovieService } from './Services/movie.service';
import { SuggestionService } from './Services/suggestion.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      GuideboxService,
      SuggestionGeneratorService,
      MovieService,
      SuggestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
