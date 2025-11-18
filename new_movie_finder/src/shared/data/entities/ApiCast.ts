import {ApiActor} from "./ApiActor";
import {ApiCrew} from "./ApiCrew";

/**
 * This is the API response you will get from the server when you want to get cast of a given
 * movie (We usually do that when we are in `MovieScreen`).
 */
export type ApiCast = {
    cast: ApiActor[];
    crew: ApiCrew[];
    id: number;
}


