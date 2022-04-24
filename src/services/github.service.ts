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

type GitHubUserRepo = {
  username: string;
  repositoryName: string;
};

/**
 * `GET` request to fetch repository details, passing an username and
 * a repository full name.
 */
export const getRepository = async ({
  username,
  repositoryName,
}: GitHubUserRepo): Promise<Response> =>
  await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}`);

/**
 * `GET` request to fetch repository commits, passing an username and
 * a repository full name.
 */
export const getRepositoryCommits = async ({
  username,
  repositoryName,
}: GitHubUserRepo): Promise<Response> =>
  await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/commits`);

/**
 * `GET` request to fetch repository languages, passing an username and
 * a repository full name.
 */
export const getRepositoryLanguages = async ({
  username,
  repositoryName,
}: GitHubUserRepo): Promise<Response> =>
  await fetch(
    `${GITHUB_API_URL}/repos/${username}/${repositoryName}/languages`
  );
