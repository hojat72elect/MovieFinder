import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../Constants";
import {ApiTmdbService} from "../ApiTmdbService";

const TrendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;

export const fetchTrendingMovies = () => {
    return ApiTmdbService(TrendingMoviesEndpoint);
}
