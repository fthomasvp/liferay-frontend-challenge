import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import { render, cleanup, waitFor, fireEvent } from 'utils/test-utils';
import { GitHubRepo } from 'services/github.service';
import ListRepos from './card-list-repos.component';

describe('ListRepos', () => {
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

  it('should show card header', () => {
    const { getByRole, getByTitle } = render(<ListRepos />, {
      homeProviderProps,
      searchBarProviderProps,
    });

    expect(getByRole('img', { name: 'Liferay logo' })).toBeInTheDocument();
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

  // it.skip('when no commit is found, should display "No commits yet" on card', () => {
  //   const [repository] = repositories;

  //   repository.lastCommitAt = null;

  //   const updatedProps = {
  //     ...props,
  //     repositories: [repository],
  //   };

  //   const { getByTestId } = render(
  //     <HomeContext.Provider value={updatedProps}>
  //       <DynamicDisplay {...dynamicDisplayProps} />
  //     </HomeContext.Provider>
  //   );
  //   expect(getByTestId('lastCommitAt')).toHaveTextContent('No commits yet');
  // });

  // it.skip('when no license is found, should display "N/A" on card', () => {
  //   const [repository] = repositories;

  //   repository.license = null;

  //   const updatedProps = {
  //     ...props,
  //     repositories: [repository],
  //   };

  //   const { getByTestId } = render(
  //     <HomeContext.Provider value={updatedProps}>
  //       <DynamicDisplay {...dynamicDisplayProps} />
  //     </HomeContext.Provider>
  //   );
  //   expect(getByTestId('license')).toHaveTextContent('License N/A');
  // });

  // it.skip('when click on the trash icon, should display the delete modal', async () => {
  //   const { getByTestId, getByText } = render(
  //     <HomeContext.Provider value={props}>
  //       <DynamicDisplay {...dynamicDisplayProps} />
  //     </HomeContext.Provider>
  //   );

  //   fireEvent.click(getByTestId('trashIcon'));

  //   const repositoryFullName = await waitFor(() =>
  //     getByTestId('repositoryFullName')
  //   );
  //   expect(repositoryFullName).toHaveTextContent('liferay/clay');
  //   expect(getByText('Delete')).toBeInTheDocument();
  //   expect(getByText('Cancel')).toBeInTheDocument();
  // });
});
