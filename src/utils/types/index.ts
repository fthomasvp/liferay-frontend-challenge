export type GitHubRepo = {
  id: number;
  full_name: string;
  created_at: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  license: {
    name: string;
  } | null;
  lastCommitAt: string | null;
  isFavored: boolean;
};

export type Filter = {
  repositoryName?: string;
  isFavored?: boolean;
};
