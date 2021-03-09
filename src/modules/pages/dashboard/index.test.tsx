import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Dashboard from './index';
import { DashboardContext } from 'contexts/dashboard';
import { GitHubRepo } from 'utils/types';

describe('<Dashboard />', () => {
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
      isFavored: false,
    },
  ];

  const props = {
    repositories,
    filteredRepositories: [],
    setFilteredRepositories: jest.fn(),
    selectedRepository: repositories[0],
    setSelectedRepository: jest.fn(),
    addRepository: jest.fn(),
    deleteRepository: jest.fn(),
    filterRepositories: jest.fn(),
    orderRepositories: jest.fn(),
    isFiltering: false,
    setIsFiltering: jest.fn(),
    favorRepository: jest.fn(),
    starIcon: true,
    setStarIcon: jest.fn(),
  };

  test('should render correctly', () => {
    const { container } = render(
      <DashboardContext.Provider value={props}>
        <Dashboard />
      </DashboardContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test('should display the Header and an Empty State', async () => {
    const { getByTestId, getByText } = render(
      <DashboardContext.Provider value={props}>
        <Dashboard />
      </DashboardContext.Provider>
    );

    expect(getByTestId('managementToolbar')).toBeInTheDocument();
    expect(
      getByText('Add some repositories by clicking add new repository')
    ).toBeInTheDocument();
  });
});
