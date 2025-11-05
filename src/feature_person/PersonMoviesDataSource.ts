import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../shared/data/Constants";
import {ApiTmdbService} from "../shared/data/ApiTmdbService";


const personMoviesEndpoint = (id: number) => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const fetchPersonMovies = (personId: number) => {
    return ApiTmdbService(personMoviesEndpoint(personId));
}
