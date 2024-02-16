import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../Constants";
import {ApiTmdbService, SearchParams} from "../ApiTmdbService";

const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`;


export const searchMovies = (params: SearchParams) => {
    return ApiTmdbService(searchMoviesEndpoint, params);
}
