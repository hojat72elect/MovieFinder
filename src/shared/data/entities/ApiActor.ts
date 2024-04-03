/**
 * Each one of the actors (or actresses) who have taken part in a given movie.
 * This is the not-so-much-detailed actor info that we usually consume in `MovieScreen`.
 */
export type ApiActor = {
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
