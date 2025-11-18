/**
 * I'm not really sure, but I guess it's all the people other than actors who have taken part in production of a movie.
 */
export type ApiCrew = {
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
