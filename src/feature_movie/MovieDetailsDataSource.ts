import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../shared/data/Constants";
import {ApiTmdbService} from "../shared/data/ApiTmdbService";

const movieDetailsEndpoint = (id: number) => `${baseUrl}/movie/${id}?api_key=${apiKey}`;


// movie screen apis
export const fetchMovieDetails = (id: number) => {
    return ApiTmdbService(movieDetailsEndpoint(id));
}
