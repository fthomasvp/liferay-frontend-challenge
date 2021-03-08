import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import Header from './index';
import { GitHubRepo } from 'utils/types';

describe('<Header />', () => {
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

  test('should render correctly', () => {
    const props = {
      repositories,
      addRepository,
    };

    const { container } = render(<Header {...props} />);
    expect(container).toMatchSnapshot();
  });

  test('should display a Popover, a text input and two buttons', async () => {
    const props = {
      repositories,
      addRepository,
    };

    const { getByTestId } = render(<Header {...props} />);

    fireEvent.click(getByTestId('addButtonToolbarManagement'));

    const popover = await waitFor(() => getByTestId('popover'));
    expect(popover).toBeInTheDocument();

    const repositoryTextInput = getByTestId('repositoryTextInput');
    expect(repositoryTextInput).toBeInTheDocument();

    const popoverButtonActions = getByTestId('popoverButtonActions');
    expect(popoverButtonActions.children.length).toEqual(2);
  });
});
