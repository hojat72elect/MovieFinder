import {ApiMovie} from "./ApiMovie";

export type ApiResponse = {
    page: number;
    results: ApiMovie[];
    total_pages: number;
    total_results: number;
};
