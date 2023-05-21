import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * In the context of Angular, Service is something we inject into another class as a
 * dependency. Here it works pretty much like a repository to data layer of the app.
 * This repository is for movies.
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) {
  }

  getTopRatedMovies(): Observable<any> {
    return this.httpClient.get('');
  }

  getMovieDetails() {
  }
}
