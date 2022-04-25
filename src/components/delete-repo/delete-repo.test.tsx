import React from 'react';

import { render, cleanup, waitFor } from 'utils/test-utils';
import { GitHubRepo } from 'services/github.service';
import DeleteRepoModal from './delete-repo.component';

// TODO: These tests will be implemented
describe('DeleteRepoModal', () => {
  afterEach(cleanup);

  const repositories: GitHubRepo[] = [
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
      isFilteringFavorites: false,
      setIsFilteringFavorites: jest.fn(),
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

  it('should show repo full name when modal is open', async () => {
    const [repo] = repositories;

    const { getByTestId, getByText } = render(
      <DeleteRepoModal repo={repo} visible={true} setVisible={jest.fn()} />,
      {
        homeProviderProps,
        searchBarProviderProps,
      }
    );

    const repositoryFullName = await waitFor(() =>
      getByTestId('repositoryFullName')
    );
    expect(repositoryFullName).toHaveTextContent('liferay/clay');

    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });
});
