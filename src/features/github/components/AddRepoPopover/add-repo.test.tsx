import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, cleanup } from 'utils/test-utils';
import { TGitHubRepo } from 'features/github';
import AddRepoPopover from './AddRepoPopover';

describe('AddRepoPopover', () => {
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

  it('should show input to fulfill repo full name', async () => {
    const { findByRole, findByPlaceholderText, findByLabelText } = render(
      <AddRepoPopover />,
      {
        homeProviderProps,
        searchBarProviderProps,
      }
    );

    // Open popover
    const addButton = await findByRole('button', { name: 'Add button' });
    userEvent.click(addButton);

    expect(await findByLabelText('Repository')).toBeInTheDocument();
    expect(
      await findByPlaceholderText('liferay/clay')
    ).toBeInTheDocument();
  });

  it('should show action buttons', async () => {
    const { findByRole } = render(<AddRepoPopover />, {
      homeProviderProps,
      searchBarProviderProps,
    });

    // Open popover
    const addButton = await findByRole('button', { name: 'Add button' });
    userEvent.click(addButton);

    const cancelButton = await findByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    const addRepoButton = await findByRole('button', { name: 'Add' });
    expect(addRepoButton).toBeInTheDocument();
  });

  it('should close popover when click Cancel', async () => {
    const { findByRole } = render(<AddRepoPopover />, {
      homeProviderProps,
      searchBarProviderProps,
    });

    // Open popover
    const addButton = await findByRole('button', { name: 'Add button' });
    userEvent.click(addButton);

    const cancelButton = await findByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);

    expect(cancelButton).not.toBeInTheDocument();
  });
});
