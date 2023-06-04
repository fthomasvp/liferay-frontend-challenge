export type TGitHubRepo = {
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
  isFavorited: boolean;
};

export type TGitHubCommit = {
  commit: {
    committer: {
      date: string;
      email: string;
      name: string;
    };
  };
};

export type TGitHubParams = {
  username: string;
  repositoryName: string;
};
