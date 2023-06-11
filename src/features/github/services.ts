import { GITHUB_API_URL } from 'utils/constants';
import type { TGitHubCommit, TGitHubParams, TGitHubRepo } from './types';
import { gitHubClient } from 'lib/axios';

/**
 * `GET` request to fetch repository details, passing an username and
 * a repository full name.
 */
export const getRepository = async ({
  username,
  repositoryName,
}: TGitHubParams) => {
  const { data } = await gitHubClient.get<TGitHubRepo>(
    `/repos/${username}/${repositoryName}`
  );

  return data;
};

/**
 * `GET` request to fetch repository commits, passing an username and
 * a repository full name.
 */
export const getRepositoryCommits = async ({
  username,
  repositoryName,
}: TGitHubParams) => {
  const { data } = await gitHubClient.get<TGitHubCommit[]>(
    `/repos/${username}/${repositoryName}/commits`
  );

  return data;
};

/**
 * `GET` request to fetch repository languages, passing an username and
 * a repository full name.
 */
export const getRepositoryLanguages = async ({
  username,
  repositoryName,
}: TGitHubParams): Promise<Response> =>
  await fetch(
    `${GITHUB_API_URL}/repos/${username}/${repositoryName}/languages`
  );
