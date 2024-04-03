import {ApiMovie} from "./ApiMovie";

/**
 * This is the response we get from server when we are in the "feature_home" screen and
 * make an API call to TMDB server.
 */
export type ApiResponse = {
    page: number;
    results: ApiMovie[];
    total_pages: number;
    total_results: number;
};
