import React from 'react';
import { render, cleanup } from '@testing-library/react';

import DynamicListDisplay from './index';
import { GitHubContext } from 'contexts/github';
import { GitHubRepo } from 'utils/types';

describe('<DynamicListDisplay />', () => {
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
    },
  ];
  const addRepository = jest.fn();

  const props = {
    repositories,
    addRepository,
  };

  test('should render correctly', () => {
    const { container } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test('should display repository full name on card', () => {
    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('fullName')).toHaveTextContent('liferay/clay');
  });

  test('should display repository stars count on card', () => {
    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('stargazersCount')).toHaveTextContent('Stars 156');
  });

  test('should display repository forks count on card', () => {
    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('forksCount')).toHaveTextContent('Forks 185');
  });

  test('should display repository open issues count on card', () => {
    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('openIssues')).toHaveTextContent('Open issues 55');
  });

  test('should display repository age on card', () => {
    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('age')).toBeInTheDocument();
  });

  test('should display repository last commit on card', () => {
    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('lastCommitAt')).not.toHaveTextContent('No commits yet');
  });

  test('when no commit is found, should display "No commits yet" on card', () => {
    const [repository] = repositories;

    repository.lastCommitAt = null;

    const props = {
      repositories: [repository],
      addRepository,
    };

    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('lastCommitAt')).toHaveTextContent('No commits yet');
  });

  test('should display repository license name on card', () => {
    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('license')).toHaveTextContent('License Other');
  });

  test('when no license is found, should display "N/A" on card', () => {
    const [repository] = repositories;

    repository.license = null;

    const props = {
      repositories: [repository],
      addRepository,
    };

    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('license')).toHaveTextContent('License N/A');
  });

  test('should display repository language label on card', () => {
    const { getByTestId } = render(
      <GitHubContext.Provider value={props}>
        <DynamicListDisplay />
      </GitHubContext.Provider>
    );
    expect(getByTestId('language')).toHaveTextContent('HTML');
  });
});
