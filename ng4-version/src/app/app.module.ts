import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';

import { GuideboxService } from './Services/guidebox.service';
import { SuggestionGeneratorService } from './Services/suggestion-generator.service';
import { MovieService } from './Services/movie.service';
import { SuggestionService } from './Services/suggestion.service';
import { MovieComponent } from './Components/movie/movie.component';
import { ResultsComponent } from './Components/results/results.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'results/:title', component: ResultsComponent },
    { path: 'details/:id', component: MovieDetailsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent,
    MovieComponent,
    ResultsComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
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
