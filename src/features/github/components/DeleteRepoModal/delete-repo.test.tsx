import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, cleanup } from 'utils/test-utils';
import { TGitHubRepo } from 'features/github';
import DeleteRepoModal from './DeleteRepoModal';

describe('DeleteRepoModal', () => {
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

  it('should show repo full name when modal is open', async () => {
    const [repo] = repositories;
    const setVisible = jest.fn();

    const { findByTestId } = render(
      <DeleteRepoModal visible repo={repo} setVisible={setVisible} />,
      {
        homeProviderProps,
        searchBarProviderProps,
      }
    );

    const repositoryFullName = await findByTestId('repositoryFullName');
    expect(repositoryFullName).toHaveTextContent(`${repo.full_name}`);
  });

  it('should show modal action buttons', async () => {
    const [repo] = repositories;
    const setVisible = jest.fn();

    const { findByRole } = render(
      <DeleteRepoModal visible repo={repo} setVisible={setVisible} />,
      {
        homeProviderProps,
        searchBarProviderProps,
      }
    );

    const cancelButton = await findByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    const deleteButton = await findByRole('button', { name: 'Delete' });
    expect(deleteButton).toBeInTheDocument();
  });

  it('should close modal when click Cancel', async () => {
    const [repo] = repositories;
    const setVisible = jest.fn();

    const { findByRole } = render(
      <DeleteRepoModal visible repo={repo} setVisible={setVisible} />,
      {
        homeProviderProps,
        searchBarProviderProps,
      }
    );

    const cancelButton = await findByRole('button', { name: 'Cancel' });
    userEvent.click(cancelButton);

    expect(setVisible).toHaveBeenCalledTimes(1);
  });
});
