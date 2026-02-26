export type RepoOwner = {
    login: string;
    avatar_url: string;
};

export type RepoItem = {
    id: number;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    owner: RepoOwner;
};

export type SearchReposResponse = {
    total_count: number;
    items: RepoItem[];
};

export type IssueItem = {
    id: number;
    title: string;
    html_url: string;
    state: "open"|"closed";
    user:{
        login: string;
        avatar_url: string;
    };
    comments: number;
    created_at: string;
};