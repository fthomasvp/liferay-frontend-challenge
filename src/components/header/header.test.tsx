import React from 'react';

import { render, cleanup } from 'utils/test-utils';
import { TGitHubRepo } from 'features/github';
import Header from './header.component';

describe('Header', () => {
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

  it('should show header components', async () => {
    const { getByRole } = render(<Header />, {
      homeProviderProps,
      searchBarProviderProps,
    });

    expect(getByRole('img', { name: 'github logo' })).toBeInTheDocument();

    expect(
      getByRole('button', { name: 'Filter and order' })
    ).toBeInTheDocument();
    expect(getByRole('button', { name: 'Stars' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Forks' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Open issues' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Age' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Last commit' })).toBeInTheDocument();

    expect(getByRole('textbox', { name: 'Search' })).toBeInTheDocument();

    expect(
      getByRole('button', { name: 'Star filter button' })
    ).toBeInTheDocument();

    expect(getByRole('button', { name: 'Add button' })).toBeInTheDocument();
  });
});
