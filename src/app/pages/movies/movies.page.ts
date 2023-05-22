import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {LoadingController} from "@ionic/angular";
import {PopularMoviesRemote} from "../../PopularMoviesRemote";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: PopularMoviesRemote[] = [];
  currentPage = 1;

  constructor(private movieService: MovieService, private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.loadMovies();

  }

  async loadMovies() {

    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe(result => {
      loading.dismiss();
      this.movies = [...this.movies, ...result.results];
      console.log(result);

    })
  }
}
