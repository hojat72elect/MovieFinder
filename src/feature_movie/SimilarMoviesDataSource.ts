import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../shared/data/Constants";
import {ApiTmdbService} from "../shared/data/ApiTmdbService";


const similarMoviesEndpoint = (id: number) => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;

export const fetchSimilarMovies = (movieId: number) => {
    return ApiTmdbService(similarMoviesEndpoint(movieId));
}
