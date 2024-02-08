export type ApiResponse = {
    page: number;
    results: ApiResponseResults[];
    total_pages: number;
    total_results: number;
};

export type ApiResponseResults = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type ApiMovieDetails = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: ApiMovieDetailsBelongs_to_collection;
    budget: number;
    genres: ApiMovieDetailsGenres[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ApiMovieDetailsProduction_companies[];
    production_countries: ApiMovieDetailsProduction_countries[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ApiMovieDetailsSpoken_languages[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type ApiMovieDetailsBelongs_to_collection = {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
}

export type ApiMovieDetailsGenres = {
    id: number;
    name: string;
}

export type ApiMovieDetailsProduction_companies = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export type ApiMovieDetailsProduction_countries = {
    iso_3166_1: string;
    name: string;
}

export type ApiMovieDetailsSpoken_languages = {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export type ApiMovieCredits = {
    cast: ApiMovieCreditsCast[];
    crew: ApiMovieCreditsCrew[];
    id: number;
}
export type ApiMovieCreditsCast = {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}
export type ApiMovieCreditsCrew = {
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export type ApiPersonDetails = {
    adult: boolean;
    also_known_as: any[];
    biography: string;
    birthday: string;
    deathday?: any;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export type ApiPersonMovies = {
    cast: ApiResponseResults[];
    crew: ApiPersonMoviesCrew[];
    id: number;
}
export type ApiPersonMoviesCrew = {
    adult: boolean;
    backdrop_path?: any;
    credit_id: string;
    department: string;
    genre_ids: string[];
    id: number;
    job: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}