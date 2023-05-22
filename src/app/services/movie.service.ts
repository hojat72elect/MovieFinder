import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiResult} from "../PopularMoviesRemote";

/**
 * This is our remote DataSource (in Ionic it's called service) which provides information from web server.
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) {
  }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.httpClient.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }

  getMovieDetails(id: string) {
    return this.httpClient.get<any>(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }
}
