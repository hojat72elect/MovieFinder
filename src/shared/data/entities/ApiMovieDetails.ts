import {ApiSpokenLanguage} from "./ApiSpokenLanguage";
import {ApiProductionCountry} from "./ApiProductionCountry";
import {ApiProductionCompany} from "./ApiProductionCompany";
import {ApiMovieDetailsGenre} from "./ApiMovieDetailsGenre";

/**
 * This is the API response we receive for a given movie when user clicks
 * on that specific movie, and we want to get its detailed information.
 */
export type ApiMovieDetails = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget: number;
    genres: ApiMovieDetailsGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ApiProductionCompany[];
    production_countries: ApiProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ApiSpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
