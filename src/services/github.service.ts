const GITHUB_API_URL = 'https://api.github.com';

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
