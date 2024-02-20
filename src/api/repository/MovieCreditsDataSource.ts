import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../Constants";
import {ApiTmdbService} from "../ApiTmdbService";

const movieCreditsEndpoint = (id: number) => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;

export const fetchMovieCredits = (movieId: number) => {
    return ApiTmdbService(movieCreditsEndpoint(movieId));
}