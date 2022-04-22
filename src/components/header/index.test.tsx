import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import Header from './header.component';

describe('<Header />', () => {
  afterEach(cleanup);

  test('should render correctly', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  test('should display a Popover, a text input and two buttons', async () => {
    const { getByTestId } = render(<Header />);

    fireEvent.click(getByTestId('addButtonToolbarManagement'));

    const popover = await waitFor(() => getByTestId('popover'));
    expect(popover).toBeInTheDocument();

    const repositoryTextInput = getByTestId('repositoryTextInput');
    expect(repositoryTextInput).toBeInTheDocument();

    const popoverButtonActions = getByTestId('popoverButtonActions');
    expect(popoverButtonActions.children.length).toEqual(2);
  });
});
