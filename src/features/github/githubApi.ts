import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IssueItem, RepoItem, SearchReposResponse } from "./types";


export const githubApi = createApi({
    reducerPath: "githubApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com/",
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/vnd.github+json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchRepos: builder.query<
            SearchReposResponse,
            { q: string; page: number; per_page: number }
        >({
            query: ({ q, page, per_page }) => ({
                url: "search/repositories",
                params: { q, page, per_page },
            }),
        }),
        getRepo: builder.query<RepoItem, { fullName: string }>({
            query: ({ fullName }) => `repo/${fullName}`,
        }),
        getRepoIssue: builder.query<
            IssueItem[],
            { fullName: string; page: number; per_page: number }
        >({
            query: ({ fullName, page, per_page }) => ({
                url: `repos/${fullName}/issues`,
                params: { page, per_page, state: "open" },
            }),
        }),
    }),
});

export const {
    useSearchReposQuery,
    useGetRepoQuery,
    useGetRepoIssueQuery,
} = githubApi