import {TMDB_API_KEY as apiKey} from "./Secrets";
import axios from "axios";

// endpoints
const apiBaseUrl: string = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;


// endpoints with dynamic params

// movie
const movieDetailsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// person
const personDetailsEndpoint = (id: number) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id: number) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = (posterPath: string | null) => posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null;
export const image342 = (posterPath: string | null) => posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
export const image185 = (posterPath: string) => posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;


// fallback images
export const fallbackMoviePoster: string = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

type SearchParams = {
    query: string;
    include_adult: boolean;
    language: string;
    page: string;
};

type ApiCallOptions = {
    method: string;
    url: string;
    params: SearchParams | null;
};

const apiCall = async (endpoint: string, params?: SearchParams) => {
    const options: ApiCallOptions = {
        method: 'GET',
        url: endpoint,
        params: params ? params : null,
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('error: ', error);
        return {};
    }
}

// home screen apis
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}


// movie screen apis
export const fetchMovieDetails = (id: number) => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId: number) => {
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId: number) => {
    return apiCall(similarMoviesEndpoint(movieId));
}

// person screen apis
export const fetchPersonDetails = (personId: number) => {
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId: number) => {
    return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const searchMovies = (params: SearchParams) => {
    return apiCall(searchMoviesEndpoint, params);
}
