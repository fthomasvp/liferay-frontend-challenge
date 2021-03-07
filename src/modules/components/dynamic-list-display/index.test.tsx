import React from 'react';
import { render, cleanup } from '@testing-library/react';

import DynamicListDisplay from './index';
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

  test('should render correctly', () => {
    const props = {
      repositories,
    };

    const { container } = render(<DynamicListDisplay {...props} />);
    expect(container).toMatchSnapshot();
  });

  test('should display repository full name on card', () => {
    const props = {
      repositories,
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('fullName')).toHaveTextContent('liferay/clay');
  });

  test('should display repository stars count on card', () => {
    const props = {
      repositories,
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('stargazersCount')).toHaveTextContent('Stars 156');
  });

  test('should display repository forks count on card', () => {
    const props = {
      repositories,
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('forksCount')).toHaveTextContent('Forks 185');
  });

  test('should display repository open issues count on card', () => {
    const props = {
      repositories,
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('openIssues')).toHaveTextContent('Open issues 55');
  });

  test('should display repository age on card', () => {
    const props = {
      repositories,
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('age')).toHaveTextContent('Age over 6 years ago');
  });

  test('should display repository last commit on card', () => {
    const props = {
      repositories,
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('lastCommitAt')).toHaveTextContent('2 days ago');
  });

  test('when no commit is found, should display "No commits yet" on card', () => {
    const [repository] = repositories;

    repository.lastCommitAt = null;

    const props = {
      repositories: [repository],
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('lastCommitAt')).toHaveTextContent('No commits yet');
  });

  test('should display repository license name on card', () => {
    const props = {
      repositories,
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('license')).toHaveTextContent('License Other');
  });

  test('when no license is found, should display "N/A" on card', () => {
    const [repository] = repositories;

    repository.license = null;

    const props = {
      repositories: [repository],
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('license')).toHaveTextContent('License N/A');
  });

  test('should display repository language label on card', () => {
    const props = {
      repositories,
    };

    const { getByTestId } = render(<DynamicListDisplay {...props} />);
    expect(getByTestId('language')).toHaveTextContent('HTML');
  });
});
