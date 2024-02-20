import {API_BASE_URL as baseUrl, TMDB_API_KEY as apiKey} from "../Constants";
import {ApiTmdbService} from "../ApiTmdbService";

const personDetailsEndpoint = (id: number) => `${baseUrl}/person/${id}?api_key=${apiKey}`;

export const fetchPersonDetails = (personId: number) => {
    return ApiTmdbService(personDetailsEndpoint(personId));
}
