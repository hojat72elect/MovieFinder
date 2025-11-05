import {ApiTmdbService} from "../ApiTmdbService";
import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../Constants";

const recentlyReleasedMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;

export const fetchRecentlyReleasedMovies = () => {
    return ApiTmdbService(recentlyReleasedMoviesEndpoint);
}
