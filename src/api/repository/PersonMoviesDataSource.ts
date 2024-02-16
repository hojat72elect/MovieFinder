import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../Constants";
import {ApiTmdbService} from "../ApiTmdbService";

const personMoviesEndpoint = (id: number) => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const fetchPersonMovies = (personId: number) => {
    return ApiTmdbService(personMoviesEndpoint(personId));
}
