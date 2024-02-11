import {ApiResponseResults} from "./ApiResponseResults";

export type ApiResponse = {
    page: number;
    results: ApiResponseResults[];
    total_pages: number;
    total_results: number;
};
