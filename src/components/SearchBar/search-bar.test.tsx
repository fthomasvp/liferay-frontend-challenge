import React from 'react';

import { render, cleanup } from 'utils/test-utils';
import { TGitHubRepo } from 'features/github';
import SearchBar from './SearchBar';

describe.only('SearchBar', () => {
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

  it('should show input to search a repo by full name', async () => {
    const { findByPlaceholderText, findByRole } = render(<SearchBar />, {
      homeProviderProps,
      searchBarProviderProps,
    });

    expect(
      await findByPlaceholderText('e.g. liferay/clay')
    ).toBeInTheDocument();
    expect(
      await findByRole('button', { name: 'Search Icon' })
    ).toBeInTheDocument();
  });
});
