const GITHUB_API_URL = 'https://api.github.com';

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
  isFavorited: boolean;
};

export const getRepository = async ({
  username,
  repositoryName,
}: {
  username: string;
  repositoryName: string;
}): Promise<Response> =>
  await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}`);

export const getRepositoryCommits = async ({
  username,
  repositoryName,
}: {
  username: string;
  repositoryName: string;
}): Promise<Response> =>
  await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/commits`);
