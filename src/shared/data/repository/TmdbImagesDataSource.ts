// functions to get images of different widths, (show images using these to improve the loading times):

export const getImage500 = (posterPath: string | null) => posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null;
export const getImage342 = (posterPath: string | null) => posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
export const getImage185 = (posterPath: string) => posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;

