import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {InfiniteScrollCustomEvent, LoadingController} from "@ionic/angular";
import {PopularMoviesRemote} from "../../PopularMoviesRemote";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: PopularMoviesRemote[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService, private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.loadMovies();

  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {

    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe(result => {
      loading.dismiss();
      this.movies.push(...result.results);
      console.log(result);

      event?.target.complete();
      if (event) {
        event.target.disabled = result.total_pages === this.currentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

}
