import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IssueItem, RepoItem, SearchReposResponse } from "./types";


export const githubApi = createApi({ // API 스펙(엔드포인트) 정의
    reducerPath: "githubApi", // Redux store 안에서 상태를 저장할 slice 이름
    baseQuery: fetchBaseQuery({ //HTTP 호출을 어떻게 할지
        baseUrl: "https://api.github.com/",
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/vnd.github+json");
            return headers;
        },
    }),
    endpoints: (builder) => ({ //API 정의(기능 단위)
        searchRepos: builder.query< // 조회용; 캐싱 중심, builder.mutation 이 변경(POST, PUT, DELETE)용; 캐시 무효화 중심
            SearchReposResponse,
            { q: string; page: number; per_page: number }
        >({
            query: ({ q, page, per_page }) => ({ //요청 정의
                url: "search/repositories",
                params: { q, page, per_page }, //쿼리 스트링
            }),
        }),
        getRepo: builder.query<RepoItem, { fullName: string }>({
            query: ({ fullName }) => `repos/${fullName}`,
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