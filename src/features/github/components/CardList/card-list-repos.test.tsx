import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import { render, cleanup } from 'utils/test-utils';
import { TGitHubRepo } from 'features/github';
import ListRepos from './CardList';

describe('ListRepos', () => {
  afterEach(cleanup);

  const repositories: TGitHubRepo[] = [
    {
      id: 22377139,
      full_name: 'liferay/clay',
      created_at: '2014-07-29T11:07:36Z',
      stargazers_count: 156,
      language: 'HTML',
      forks_count: 185,
      open_issues_count: 55,
      license: {
        name: 'Other',
      },
      lastCommitAt: '2021-03-05T12:23:22Z',
      isFavorited: false,
    },
  ];

  const homeProviderProps = {
    value: {
      isStarred: false,
      setIsStarred: jest.fn(),
      repositories,
      setRepositories: jest.fn(),
    },
  };
  const searchBarProviderProps = {
    value: {
      isFiltering: false,
      setIsFiltering: jest.fn(),
      isShowMobile: false,
      setIsShowMobile: jest.fn(),
      filteredRepos: [],
      setFilteredRepos: jest.fn(),
    },
  };

  it('should show card header', () => {
    const { getByRole, getByTitle } = render(<ListRepos />, {
      homeProviderProps,
      searchBarProviderProps,
    });

    expect(getByRole('img', { name: 'Liferay' })).toBeInTheDocument();
    expect(getByTitle('liferay/clay')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Star' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Trash' })).toBeInTheDocument();
  });

  it('should show repo details on card', () => {
    const { getByTestId } = render(<ListRepos />, {
      homeProviderProps,
      searchBarProviderProps,
    });

    const [repo] = repositories;

    expect(getByTestId('stargazersCount')).toHaveTextContent(
      `Stars ${repo.stargazers_count}`
    );
    expect(getByTestId('forksCount')).toHaveTextContent(
      `Forks ${repo.forks_count}`
    );
    expect(getByTestId('openIssues')).toHaveTextContent(
      `Open issues ${repo.open_issues_count}`
    );

    const formattedAge = formatDistanceToNow(new Date(repo.created_at), {
      addSuffix: true,
    });
    expect(getByTestId('age')).toHaveTextContent(`Age ${formattedAge}`);

    if (repo.lastCommitAt) {
      const formattedLastCommit = formatDistanceToNow(
        new Date(repo.lastCommitAt),
        {
          addSuffix: true,
        }
      );
      expect(getByTestId('lastCommitAt')).toHaveTextContent(
        `Last commit ${formattedLastCommit}`
      );
    }

    expect(getByTestId('license')).toHaveTextContent(
      `License ${repo.license?.name}`
    );
    expect(getByTestId('language')).toHaveTextContent('HTML');
  });

  it('should show "No commits yet" when repo does not have commits', () => {
    const [repo] = repositories;
    repo.lastCommitAt = null;

    const { getByTestId } = render(<ListRepos />, {
      homeProviderProps: {
        ...homeProviderProps,
        value: {
          ...homeProviderProps.value,
          repositories: [repo],
        },
      },
      searchBarProviderProps,
    });

    expect(getByTestId('lastCommitAt')).toHaveTextContent('No commits yet');
  });

  it('should show "N/A" when repo does not have a license', () => {
    const [repo] = repositories;
    repo.license = null;

    const { getByTestId } = render(<ListRepos />, {
      homeProviderProps: {
        ...homeProviderProps,
        value: {
          ...homeProviderProps.value,
          repositories: [repo],
        },
      },
      searchBarProviderProps,
    });
    expect(getByTestId('license')).toHaveTextContent('License N/A');
  });
});
