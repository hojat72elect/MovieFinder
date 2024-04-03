import {ApiTmdbService} from "../ApiTmdbService";
import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../Constants";

const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;

export const fetchTopRatedMovies = () => {
    return ApiTmdbService(topRatedMoviesEndpoint);
}
